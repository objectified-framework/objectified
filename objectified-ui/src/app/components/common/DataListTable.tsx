/*
 * This component is used to display data retrieved from a database, and shown in an automatically
 * rendering table.
 */

import {HEADER_COLOR} from '@/app/components/common/ColorDatabase';
import Item from '@/app/components/common/Item';
import {
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {AddOutlined, RefreshOutlined, CheckBox, Edit} from '@mui/icons-material';

/**
 * This is the input set of data required for the Data List table.
 *
 * @param header {string} containing the header that will be shown
 * @param columns {any[]} table including the name of the table result to show, along with its display description
 * @param dataset {any[]} resulting data from a data lookup, names must match the names in the columns to display, omitted if absent
 * @param isLoading {boolean} indicating if a loading state is set - will show a circular progress image if so
 * @param onAdd {function} called when the "+" button is selected
 * @param onDelete {function} called when the "trash" button is selected
 * @param onEdit {function} called when the "edit" button is selected
 * @param onRefresh {function} called when the "reload" button is selected
 * @param isEditable {function} called with the `payload` determining if the edit button appears, `true` indicates editable.
 * @param isDeletable {function} called with the `payload` determining if the delete button appears, `true` indicates deletable.
 */
export interface IDataList {
  header: string;
  columns: any[];
  dataset: any[];
  isLoading: boolean;
  onAdd?: () => any;
  onDelete?: (payload: any) => any;
  onEdit?: (payload: any) => any;
  onRefresh?: () => any;
  isAddable: boolean;
  isEditable: (payload: any) => boolean;
  isDeletable: (payload: any) => boolean;
  isRefreshable?: boolean;
  renderColumn?: (column: string, value: string) => string;
  extraIcon?: any;
  onExtraIcon?: (payload: any) => void;
}

/**
 * This is the Data List Table used for automatic display of fields and values from a table in the database.
 *
 * @param props {IDataList} object for input.
 * @constructor
 */
export const DataListTable = (props: IDataList) => {
  return (
    <>
      {/*<TableContainer>*/}
        <Table>
          <TableHead>
            <TableRow key={'data-list-table-head'} style={{ borderBottom: '1px solid #ccc' }}>
              {props.columns.map((x: any, counter: number) => (
                // @ts-ignore
                <TableCell style={{ borderBottom: '1px solid #000', padding: '4px', borderRight: '1px solid #ccc' }}
                           className={'font-thin text-slate-600'}
                           key={ `head-${counter}` }>{x.description}</TableCell>
              ))}
              {/*// @ts-ignore*/}
              <TableCell style={{ borderBottom: '1px solid #000', padding: '4px', textAlign: 'right' }}/>
            </TableRow>
          </TableHead>

          {props.isLoading ? (
            <TableBody>
              <TableRow key={'data-list-table-loading'}>
                {/*// @ts-ignore*/}
                <TableCell colSpan={props.columns.length + 1} style={{ textAlign: 'center', width: '100%', padding: '4px' }}>
                  <CircularProgress/>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {!props.dataset || !props.dataset.map || props.dataset.length === 0 ? (
                <>
                  <TableRow key={'data-list-table-empty-set'}>
                    {/*// @ts-ignore*/}
                    <TableCell colSpan={props.columns.length + 1}
                               style={{ textAlign: 'center', padding: '4px' }}
                               className={'font-thin text-xs'}>
                      Dataset is empty
                    </TableCell>
                  </TableRow>
                </>
                ) : (
                <>
                  {props.dataset.map((x, counter: number) => (
                    <TableRow key={ `row-${counter}` }>
                      {props.columns.map((y, subcounter: number) => {
                        if (y.type && y.type === 'check') {
                          if (x[y.name]) {
                            return (
                              <TableCell key={ `row-${counter}-${subcounter}` }
                               // @ts-ignore
                               style={{ textAlign: 'center', padding: '4px' }}><CheckBox style={{ color: 'green' }}/></TableCell>
                            );
                          }
                        } else if (y.type && y.type === 'uuid') {
                          const uuidSplit = x[y.name].split('-');

                          return (
                            <TableCell key={ `row-${counter}-${subcounter}` }
                                       // @ts-ignore
                                       className={'font-thin'}
                                       // @ts-ignore
                                       style={{ padding: '4px', fontSize: 13 }}>...{uuidSplit[uuidSplit.length - 1].slice(-6)}</TableCell>
                          );
                        } else if (y.type && y.type === 'date-time') {
                          const timeSplit = x[y.name] !== null ? x[y.name].split('T') : '';

                          return (
                            <TableCell key={ `row-${counter}-${subcounter}` }
                                       // @ts-ignore
                                       className={'font-thin'}
                                       // @ts-ignore
                                       style={{ padding: '4px', fontSize: 13 }}>{timeSplit[0]}</TableCell>
                          );
                        }

                        return (
                          <TableCell key={ `row-${counter}-${subcounter}` }
                                     // @ts-ignore
                                     className={'font-thin'}
                                     // @ts-ignore
                                     style={{ padding: '4px', fontSize: 13 }}>{props.renderColumn ? props.renderColumn(y.name, x[y.name]) : x[y.name]}</TableCell>
                        );
                      })}
                      <TableCell key={ `row-${counter}-icons` }
                                 // @ts-ignore
                                 style={{ padding: '4px', textAlign: 'right', width: '20%' }}>
                        <Stack direction={'row'}>
                          {props.isDeletable(x) && (
                            <Button style={{
                                      height: '24px', borderRadius: 1,
                                      border: '1px solid #44f', paddingLeft: '6px', paddingRight: '6px'
                                    }}
                                    variant={'contained'} startIcon={<DeleteIcon/>}
                                    className={'bg-red-400 text-white'}
                                    onClick={() => props.onDelete!(x)}>
                              <Typography style={{ fontWeight: 150, fontSize: 12, }} textTransform={'none'}>
                                Delete
                              </Typography>
                            </Button>
                          )}
                          &nbsp;
                          {props.isEditable(x) && (
                            <Button style={{
                                      height: '24px', borderRadius: 1,
                                      border: '1px solid #44f', paddingLeft: '6px', paddingRight: '6px'
                                    }}
                                    variant={'contained'} startIcon={<Edit/>}
                                    className={'bg-slate-300 text-black'}
                                    onClick={() => props.onEdit!(x)}>
                              <Typography style={{ fontWeight: 150, fontSize: 12, }} textTransform={'none'}>
                                Edit
                              </Typography>
                            </Button>
                          )}
                          &nbsp;
                          {props.extraIcon && props.onExtraIcon && (
                            <Button style={{
                                      height: '24px', borderRadius: 1,
                                      border: '1px solid #44f', paddingLeft: '6px', paddingRight: '6px'
                                    }}
                                    variant={'contained'} startIcon={props.extraIcon}
                                    className={'bg-slate-300 text-black'}
                                    onClick={()=> props.onExtraIcon!(x)}>
                              <Typography style={{ fontWeight: 150, fontSize: 12, }} textTransform={'none'}>
                                View
                              </Typography>
                            </Button>
                          )}
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            </TableBody>
          )}
        </Table>
      {/*</TableContainer>*/}
    </>
  );
}

export default DataListTable;
