import * as React from 'react';
import Box from '@mui/material/Box';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import SideBarMenuGroup, { SideBarMenuGroupProps } from './SideBarMenuGroup';
import {Button, IconButton, ListItem, MenuItem, Select, Stack, Typography} from '@mui/material';
import {
  AddOutlined,
  ArticleOutlined,
  BadgeOutlined,
  ClassOutlined,
  DocumentScannerOutlined,
  ElectricBoltOutlined,
  ExtensionOutlined,
  GroupsOutlined,
  InfoOutlined,
  InputOutlined,
  LinkOutlined, MenuOpenOutlined, MenuOutlined,
  PersonOutlined,
  PostAddOutlined,
  SaveAltOutlined,
  SaveAsOutlined, SearchOutlined, SettingsOutlined,
  WorkspacesOutlined
} from '@mui/icons-material';
import {usePathname, useRouter} from 'next/navigation';
import ListItemIcon from "@mui/material/ListItemIcon";
import {SELECTED_MENU_COLOR} from "@/app/components/common/ColorDatabase";
import Item from "@/app/components/common/Item";
import {errorDialog} from "@/app/components/common/ConfirmDialog";

const FireNav = styled(List)<{ component?: React.ElementType }>({
  "& .MuiListItemButton-root": {
    paddingLeft: 24,
    paddingRight: 24,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
});

export interface SideBarProps {
  width: number;
  onHomeClicked: () => void,
  onHamburgerContracted?: () => void,
  onHamburgerExpanded?: () => void,
}

export default function SideBar(props: SideBarProps) {
  const router = useRouter();
  const [sidebarState, setSidebarState] = React.useState(false);
  const currentPath: string = usePathname();

  const swapMenuStates = () => {
    if (sidebarState) {
      if (props.onHamburgerExpanded) {
        props.onHamburgerExpanded();
      }
    } else {
      if (props.onHamburgerContracted) {
        props.onHamburgerContracted();
      }
    }

    setSidebarState(!sidebarState);
  }

  const selectedColor = (path: string) => (currentPath.startsWith(path) ? '#000' : '#ccc');
  const selectedBackgroundColor = (path: string) => (currentPath.startsWith(path) ? SELECTED_MENU_COLOR : '#060606');

  // Compacted
  if (sidebarState) {
    return (
      <>
        <div style={{
          position: 'fixed', top: '0', left: '0', height: '48px', borderBottom: '1px solid #336', width: '53px',
          paddingTop: '12px', backgroundColor: '#060606', color: '#fff', textAlign: 'left', paddingLeft: '14px'
        }}>
          <Stack direction={'row'}>
            <IconButton style={{color: '#fff', padding: '0px'}}
                        onClick={swapMenuStates}>
              {sidebarState ? <MenuOpenOutlined/> : <MenuOutlined/>}
            </IconButton>
          </Stack>
        </div>

        <div style={{
          position: 'fixed', top: '48px', height: 'calc(100% - 96px)', backgroundColor: '#060606',
          overflowY: 'none', width: '53px', color: '#ccc', paddingTop: '10px', paddingLeft: '2px',
          paddingRight: '2px'
        }}>
          <Stack direction={'column'}>
            <Item sx={{ padding: '0px', paddingTop: '5px', backgroundColor: '#060606', color: selectedColor('/data-types') }}>
              <ListItemButton sx={{ paddingLeft: '10px', minHeight: 32, borderRadius: 2, border: '1px solid #060606',
                '&:hover': {
                  border: '1px solid #fff', backgroundColor: selectedBackgroundColor('/data-types')
                }, backgroundColor: selectedBackgroundColor('/data-types')
              }} onClick={() => router.push('/data-types')}>
                <ListItemIcon sx={{ color: 'inherit', minWidth: '40px' }}><ExtensionOutlined/></ListItemIcon>
              </ListItemButton>
            </Item>

            <Item sx={{ padding: '0px', paddingTop: '5px', backgroundColor: '#060606', color: selectedColor('/class') }}>
              <ListItemButton sx={{ paddingLeft: '10px', minHeight: 32, borderRadius: 2, border: '1px solid #060606',
                '&:hover': {
                  border: '1px solid #fff', backgroundColor: selectedBackgroundColor('/classes')
                }, backgroundColor: selectedBackgroundColor('/classes')
              }} onClick={() => router.push('/classes')}>
                <ListItemIcon sx={{ color: 'inherit', minWidth: '40px' }}><ClassOutlined/></ListItemIcon>
              </ListItemButton>
            </Item>

            <Item sx={{ padding: '0px', paddingTop: '5px', backgroundColor: '#060606', color: selectedColor('/fields') }}>
              <ListItemButton sx={{ paddingLeft: '10px', minHeight: 32, borderRadius: 2, border: '1px solid #060606',
                '&:hover': {
                  border: '1px solid #fff', backgroundColor: selectedBackgroundColor('/fields')
                }, backgroundColor: selectedBackgroundColor('/fields')
              }} onClick={() => router.push('/fields')}>
                <ListItemIcon sx={{ color: 'inherit', minWidth: '40px' }}><ArticleOutlined/></ListItemIcon>
              </ListItemButton>
            </Item>
          </Stack>
        </div>

        <div style={{
          height: '48px', backgroundColor: '#0f0f0f', position: 'fixed', top: 'calc(100% - 48px)',
          width: '53px', borderTop: '1px solid #336', paddingTop: '10px', paddingLeft: '10px', color: '#ccc'
        }}>
          <ElectricBoltOutlined/>
        </div>
      </>
    );
  }

  return (
    <>
      <div style={{
        position: 'fixed', top: '0', left: '0', height: '48px', borderBottom: '1px solid #336', width: '260px',
        paddingTop: '12px', backgroundColor: '#060606', color: '#fff', textAlign: 'left', paddingLeft: '12px'
      }}>
        <Stack direction={'row'}>
          <div style={{width: '75%'}}>
            <b>Objectified Console</b>
          </div>
          <div style={{width: '25%', textAlign: 'right', paddingRight: '12px', paddingTop: '0px'}}>
            <IconButton style={{color: '#fff', padding: '0px'}}
                        onClick={swapMenuStates}>
              {sidebarState ? <MenuOpenOutlined/> : <MenuOutlined/>}
            </IconButton>
          </div>
        </Stack>
      </div>

      <div style={{ position: 'fixed', top: '48px', height: 'calc(100% - 96px)', backgroundColor: '#060606',
        overflowY: 'auto', width: '260px', color: '#ccc', paddingLeft: '10px', paddingTop: '10px',
        paddingRight: '10px' }}>
        <Stack direction={'column'}>
          <Item sx={{ padding: '0px', paddingTop: '5px', backgroundColor: '#060606', color: selectedColor('/data-types') }}>
            <ListItemButton sx={{ paddingLeft: '10px', minHeight: 32, borderRadius: 2, border: '1px solid #060606',
              '&:hover': {
                border: '1px solid #fff', backgroundColor: selectedBackgroundColor('/data-types')
              }, backgroundColor: selectedBackgroundColor('/data-types')
            }} onClick={() => router.push('/data-types')}>
              <ListItemIcon sx={{ color: 'inherit', minWidth: '40px' }}><ExtensionOutlined/></ListItemIcon>
              <ListItemText sx={{ textAlign: 'left', paddingLeft: '0px' }}
                            primaryTypographyProps={{
                              fontSize: 14,
                              fontWeight: "medium",
                            }}>
                Data Types
              </ListItemText>
            </ListItemButton>
          </Item>

          <Item sx={{ padding: '0px', paddingTop: '5px', backgroundColor: '#060606', color: selectedColor('/classes') }}>
            <ListItemButton sx={{ paddingLeft: '10px', minHeight: 32, borderRadius: 2, border: '1px solid #060606',
              '&:hover': {
                border: '1px solid #fff', backgroundColor: selectedBackgroundColor('/classes')
              }, backgroundColor: selectedBackgroundColor('/classes')
            }} onClick={() => router.push('/classes')}>
              <ListItemIcon sx={{ color: 'inherit', minWidth: '40px' }}><ClassOutlined/></ListItemIcon>
              <ListItemText sx={{ textAlign: 'left', paddingLeft: '0px' }}
                            primaryTypographyProps={{
                              fontSize: 14,
                              fontWeight: "medium",
                            }}>
                Classes
              </ListItemText>
            </ListItemButton>
          </Item>

          <Item sx={{ padding: '0px', paddingTop: '5px', backgroundColor: '#060606', color: selectedColor('/fields') }}>
            <ListItemButton sx={{ paddingLeft: '10px', minHeight: 32, borderRadius: 2, border: '1px solid #060606',
              '&:hover': {
                border: '1px solid #fff', backgroundColor: selectedBackgroundColor('/fields')
              }, backgroundColor: selectedBackgroundColor('/fields')
            }} onClick={() => router.push('/fields')}>
              <ListItemIcon sx={{ color: 'inherit', minWidth: '40px' }}><ArticleOutlined/></ListItemIcon>
              <ListItemText sx={{ textAlign: 'left', paddingLeft: '0px' }}
                            primaryTypographyProps={{
                              fontSize: 14,
                              fontWeight: "medium",
                            }}>
                Fields
              </ListItemText>
            </ListItemButton>
          </Item>
        </Stack>
      </div>

      <div style={{ height: '48px', backgroundColor: '#0f0f0f', position: 'fixed', top: 'calc(100% - 48px)',
        width: '260px', borderTop: '1px solid #336', paddingTop: '10px', paddingLeft: '10px', color: '#ccc' }}>
        <ElectricBoltOutlined/> powered by <b>Objectified</b>
      </div>
    </>
  );
}