'use client';

import {
  Dialog,
} from "@mui/material";
import {useState, useEffect} from "react";
import DataListTable from "@/app/components/common/DataListTable";
import {formItems, tableItems} from "@/app/properties/index";
import AutoForm from "@/app/components/common/AutoForm";
import {useSession} from 'next-auth/react';
import {errorDialog} from "@/app/components/common/ConfirmDialog";
import {listProperties, saveProperty, putProperty, deleteProperty} from "@/app/services/property";
import {listFields} from "@/app/services/field";
import {listClasses} from "@/app/services/class";

const Properties = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataPayload, setDataPayload] = useState([]);
  const [fields, setFields] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedLine, setSelectedLine] = useState({});

  const resetSelectedLine = () => {
    setSelectedLine({});
  }

  const refreshProperties = () => {
    setIsLoading(true);

    listProperties().then((x) => {
      setDataPayload(x);
    }).finally(() => {
      setIsLoading(false);
    });
  }

  const refreshClasses = () => {
    setIsLoading(true);

    listClasses().then((x: any) => {
      let mappedResults = x.map((y) => {
        return {
          classId: y.id,
          name: y.name,
        };
      });

      mappedResults = [
        {
          classId: null,
          name: 'No Class Selected'
        },
        ...mappedResults,
      ]
      formItems[1].dataset = mappedResults;
      setClasses(mappedResults);
    }).finally(() => {
      setIsLoading(false);
    });
  }

  const refreshFields = async (): Promise<void> => {
    await listFields()
      .then((x) => {
        let mappedResults = x.map((y) => {
          return {
            fieldId: y.id,
            name: y.name,
          };
        });

        mappedResults = [
          {
            fieldId: null,
            name: 'No Field Selected'
          },
          ...mappedResults,
        ]
        formItems[0].dataset = mappedResults;
        setFields(mappedResults);
      })
      .catch((x) => {
        return Promise.reject();
      });
  }

  useEffect(() => {
    refreshProperties();
    refreshFields();
    refreshClasses();
    resetSelectedLine();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const saveClicked = async (payload: any) => {
    if (!payload) {
      errorDialog('Empty payload.');
      return;
    }

    if (payload.name.charAt(0) === payload.name.charAt(0).toUpperCase() || payload.name.includes('-')) {
      errorDialog('Property names must be lowercase, pascalCase, or snake_case.');
      return;
    }

    if (payload.id) {
      await putProperty(payload)
        .then((x) => {
          refreshProperties();
          setOpen(false);
        })
        .catch((x) => {
          errorDialog('Failed to update this property - duplicate entry or other error.');
        });
    } else {
      payload.ownerId = session.objectified.id;

      await saveProperty(payload)
        .finally(() => {
          refreshProperties();
          setOpen(false);
        });
    }
  }

  const deleteClicked = async (payload: any) => {
    if (!payload.enabled) {
      errorDialog('This data type has already been deleted.');
      return;
    }

    await deleteProperty(payload.id)
      .then((x) => {
        refreshProperties();
      })
      .catch((x) => {
        errorDialog('You do not have permission to remove this class.');
      });
  }

  const editClicked = async (payload: any) => {
    console.log(payload);

    if (payload.tenantId != session.currentTenant) {
      errorDialog('You cannot edit properties that you or your tenant do not own.');
      return;
    }

    setSelectedLine(payload);
    setOpen(true);
  }

  return (
    <>
      <Dialog fullWidth={'md'} open={open} onClose={handleClose}
              scroll={'paper'}
              PaperProps={{ style: {
                  minHeight: '90%',
                  maxHeight: '90%',
                }}}>
      <AutoForm header={'Properties'}
                  formElements={formItems}
                  editPayload={selectedLine}
                  onSave={saveClicked}
                  onCancel={handleClose}/>
      </Dialog>

      <div style={{width: '100%', padding: '10px'}}>
        <DataListTable header={'Properties'}
                       columns={tableItems}
                       dataset={dataPayload}
                       isLoading={isLoading}
                       isAddable={true}
                       onAdd={() => {
                         if (fields.length === 0) {
                           errorDialog('You need to add at least one field before you can create a property.');
                           return;
                         }
                         resetSelectedLine();
                         setOpen(true);
                       }}
                       onDelete={(payload) => deleteClicked(payload)}
                       onEdit={(payload: any) => editClicked(payload)}
                       onRefresh={() => refreshProperties()}
                       isEditable={(x: any) => {
                         return (x.tenantId === session.currentTenant) && x.enabled;
                       }}
                       isDeletable={(x: any) => {
                         return (x.tenantId === session.currentTenant) && x.enabled;
                       }}
                       renderColumn={(column, value) => {
                         if (column === 'fieldId') {
                           const result = fields.filter((x) => x['fieldId'] === value);

                           if (value === null) {
                             return '';
                           }

                           return (result.length > 0) ? result[0].name : value;
                         } else if (column === 'classId') {
                           const result = classes.filter((x) => x['classId'] === value);

                           if (value === null) {
                             return '';
                           }

                           return (result.length > 0) ? result[0].name : value;
                         }

                         return value;
                       }}
        />
      </div>
    </>
  );
}

export default Properties;
