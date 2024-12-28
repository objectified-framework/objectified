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
 */
export interface IDataList {
  header: string;
  columns: any[];
  dataset: any[];
  isLoading: boolean;
  onAdd: () => any;
  onDelete: (payload: any) => any;
  onEdit: (payload: any) => any;
  onRefresh: () => any;
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
      <div style={{width: '100%', backgroundColor: HEADER_COLOR, color: '#fff', height: '50px', padding: '8px',
                   borderBottom: '1px solid #000' }}>
        <Stack direction={'row'}>
          <Item sx={{width: '50%', textAlign: 'left', backgroundColor: 'inherit', padding: '0px'}}>
            <Typography sx={{color: '#fff'}} variant={'h4'} fontWeight={'bold'}>{props.header}</Typography>
          </Item>

          <Item sx={{width: '50%', textAlign: 'right', backgroundColor: 'inherit', padding: '0px'}}>
            <Button sx={{color: '#fff'}} onClick={() => props.onRefresh()}>
              <RefreshOutlined/>
            </Button>

            <Button sx={{color: '#fff'}} onClick={() => props.onAdd()}>
              <AddOutlined/>
            </Button>
          </Item>
        </Stack>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow key={'tablehead'}>
              {props.columns.map((x, counter: number) => (
                <TableCell style={{ backgroundColor: '#ccc', borderBottom: '1px solid #000' }} key={ `head-${counter}` }>{x.description}</TableCell>
              ))}
              <TableCell style={{ backgroundColor: '#ccc', borderBottom: '1px solid #000' }}>Action</TableCell>
            </TableRow>
          </TableHead>

          {props.isLoading ? (
            <TableBody>
              <TableRow key={'tableloading'}>
                <TableCell colSpan={props.columns.length} style={{ textAlign: 'center' }}>
                  <CircularProgress/>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {!props.dataset || !props.dataset.map || props.dataset.length === 0 ? (
                <>
                  <TableRow key={'emptyset'}>
                    <TableCell colSpan={props.columns.length} style={{ textAlign: 'center' }}>
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
                              <TableCell key={ `row-${counter}-${subcounter}` }><CheckBox style={{ color: 'green' }}/></TableCell>
                            );
                          }
                        } else if (y.type && y.type === 'uuid') {
                          const uuidSplit = x[y.name].split('-');

                          return (
                            <TableCell key={ `row-${counter}-${subcounter}` }>...{uuidSplit[uuidSplit.length - 1]}</TableCell>
                          );
                        } else if (y.type && y.type === 'date-time') {
                          const timeSplit = x[y.name].split('T');

                          return (
                            <TableCell key={ `row-${counter}-${subcounter}` }>{timeSplit[0]} {timeSplit[1]}</TableCell>
                          );
                        }

                        return (
                          <TableCell key={ `row-${counter}-${subcounter}` }>{x[y.name]}</TableCell>
                        );
                      })}
                      <TableCell key={ `row-${counter}-icons` }>
                        <Stack direction={'row'}>
                          <IconButton onClick={() => props.onDelete(x)}>
                            <DeleteIcon/>
                          </IconButton>
                          <IconButton onClick={() => props.onEdit(x)}>
                            <Edit/>
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </>
  );
}

export default DataListTable;
