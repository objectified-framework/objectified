'use client';

import {signIn, signOut, useSession} from "next-auth/react";
import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  Divider,
  Menu,
  MenuList,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Stack,
  Typography
} from "@mui/material";
import {useRouter} from "next/navigation";
import {Inter} from "next/font/google";
import SideBar from "@/app/components/SideBar";
import {useState} from "react";
import Item from "@/app/components/common/Item";
import ProfileForm from "@/app/components/profile/ProfileForm";
import HelpIcon from '@mui/icons-material/Help';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FolderIcon from '@mui/icons-material/Folder';
import ReorderIcon from '@mui/icons-material/Reorder';
import TenantSelector from "@/app/components/common/TenantSelector";

const VERSION = '0.0.3';

const NavItems = [
  {
    label: 'Summary',
    url: '/summary',
  },
  {
    label: 'Data Types',
    url: '/data-types',
  },
  {
    label: 'Classes',
    url: '/classes',
  },
  {
    label: 'Fields',
    url: '/fields',
  },
  {
    label: 'Properties',
    url: '/properties',
  },
  {
    label: 'Class Properties',
    url: '/class-properties',
  },
  {
    label: 'What\'s New',
    url: '/whats-new',
  },
];

const Dashboard = ({ children }: { children?: React.ReactNode }) => {
  const {data: session, status, update} = useSession();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [logoutShowing, setLogoutShowing] = useState(false);
  const [profileShowing, setProfileShowing] = useState(false);
  const open = Boolean(anchorEl);

  if (status === 'unauthenticated') {
    return (<>
      {children}
    </>);
  }

  if (status === 'loading') {
    return (<></>);
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleTenantChanged = (tenantId: string) => {
    update({ currentTenant: tenantId });
  }

  return (
    <>
      <Dialog open={logoutShowing}>
        <DialogContent>
          <DialogContentText>
            <Typography>
              Logging out ...
            </Typography>
          </DialogContentText>
        </DialogContent>
      </Dialog>

      <Dialog open={profileShowing} fullWidth maxWidth={'sm'}>
        <DialogContent>
          <ProfileForm onClose={() => {
            setProfileShowing(false);
          }}/>
        </DialogContent>
      </Dialog>

      <div style={{ display: 'flex', width: '100%' }}>
        {/*Top Bar*/}
        <div style={{
          position: 'fixed', width: '100%', height: '32px',
          fontSize: 13,
        }} className={'bg-zinc-400 text-black font-light'}>
          <Stack direction={'row'}>
            <div style={{ width: '50%', textAlign: 'left' }}>
              <Stack direction={'row'}>
                <img src={'/Objectified-05.png'} style={{ height: '32px', width: '110px' }}/>
                <Typography style={{ fontWeight: 200, fontSize: 14, padding: '5px' }}>
                  Control Center v{VERSION}
                </Typography>
              </Stack>
            </div>

            <div style={{ width: '50%', textAlign: 'right', padding: '4px' }}>
              <Button style={{
                height: '24px', backgroundColor: '#ccc', borderRadius: 2,
                color: 'black', border: '1px solid #fff', paddingLeft: '6px', paddingRight: '6px' }}
                variant={'contained'} startIcon={<LibraryBooksIcon/>}
                onClick={() => window.open('https://docs.objectified.dev', '_none')}>
                <Typography style={{ fontWeight: 150, fontSize: 12, }} textTransform={'none'}>
                  Documentation
                </Typography>
              </Button>
              &nbsp;&nbsp;
              <Button style={{
                height: '24px', backgroundColor: '#33f', borderRadius: 2,
                color: 'white', border: '1px solid #44f', paddingLeft: '6px', paddingRight: '6px' }}
                      variant={'contained'} startIcon={<CreateNewFolderIcon/>}
                      onClick={() => {}}>
                <Typography style={{ fontWeight: 150, fontSize: 12, }} textTransform={'none'}>
                  Create Project
                </Typography>
              </Button>
              &nbsp;&nbsp;
              <Button style={{
                height: '24px', backgroundColor: '#333', borderRadius: 2,
                color: 'white', border: '1px solid #fff', paddingLeft: '6px', paddingRight: '6px' }}
                      variant={'contained'}
                      startIcon={<PersonIcon/>}
                      endIcon={<ExpandMoreIcon/>}>
                <Typography style={{ fontWeight: 150, fontSize: 12, }} textTransform={'none'}>
                  {session?.user?.name ?? 'Unregistered User'}
                </Typography>
              </Button>
            </div>
          </Stack>
        </div>

        <div style={{ position: 'fixed', top: '32px', width: '260px', height: 'calc(100% - 32px)' }}
             className={'bg-zinc-400 dark:bg-gray-900 text-black dark:text-white font-light'}>
          <Stack direction={'column'}>
            <div style={{ width: '100%' }}>
              <TenantSelector onTenantChanged={handleTenantChanged}/>
            </div>
          </Stack>

          <div style={{ width: '100%', height: '100%', paddingLeft: '8px', paddingRight: '8px', paddingBottom: '40px' }}
               className={'bg-zinc-400 text-black'}>
            <div style={{ width: '100%', height: '100%' }}
                 className={'bg-white'}>
              <MenuList style={{ padding: '0px' }}>
                <MenuItem style={{ paddingTop: '2px', paddingBottom: '2px' }}>
                  <ListItemIcon style={{ paddingRight: '0px' }}>
                    <ReorderIcon style={{ width: '18px', height: '18px' }}/>
                  </ListItemIcon>
                  <ListItemText>
                    <Typography className={'text-sm font-extralight'}>
                      Projects
                    </Typography>
                  </ListItemText>
                  <ExpandMoreIcon style={{ width: '18px', height: '18px' }}/>
                </MenuItem>
                <MenuItem style={{ paddingLeft: '36px', paddingTop: '2px', paddingBottom: '2px' }}
                          className={'text-sm font-extralight'}>
                  <ListItemIcon>
                    <FolderIcon style={{ width: '18px', height: '18px' }}/>
                  </ListItemIcon>
                  Default
                </MenuItem>
              </MenuList>
            </div>
          </div>
        </div>

        {/*/!*Top Right-hand Side Screen*!/*/}
        {/*<div style={{ position: 'fixed', width: calcWidth, left: mainLeft, backgroundColor: '#000', height: '52px' }}>*/}
        {/*  <Stack direction={'row'} spacing={2} sx={{ textAlign: 'right' }}>*/}
        {/*    <Item sx={{ width: '80%', textAlign: 'left', paddingTop: '4px', backgroundColor: '#000',*/}
        {/*                color: '#fff' }}>*/}
        {/*      <TenantSelector onTenantChanged={handleTenantChanged}/>*/}
        {/*    </Item>*/}

        {/*    <Item sx={{ width: '20%', textAlign: 'right', padding: '0px', backgroundColor: '#000' }}>*/}
        {/*      <Button sx={{ padding: '2px'}}*/}
        {/*              onClick={handleClick}*/}
        {/*              aria-controls={open ? 'simple-menu' : undefined}*/}
        {/*              aria-haspopup={'true'}*/}
        {/*              aria-expanded={open ? 'true' : undefined}>*/}
        {/*        <Avatar alt={`${session?.user?.name}`} src={`${session?.user?.image}`}/>*/}
        {/*      </Button>*/}
        {/*      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>*/}
        {/*        <MenuItem onClick={() => {*/}
        {/*          handleClose();*/}
        {/*          setProfileShowing(true);*/}
        {/*        }}>Profile</MenuItem>*/}
        {/*        <Divider/>*/}
        {/*        <MenuItem onClick={async () => {*/}
        {/*          handleClose();*/}
        {/*          setLogoutShowing(true);*/}
        {/*          await signOut({*/}
        {/*            callbackUrl: '/login',*/}
        {/*            redirect: true,*/}
        {/*          });*/}
        {/*        }}>Logout</MenuItem>*/}
        {/*      </Menu>*/}
        {/*    </Item>*/}
        {/*  </Stack>*/}
        {/*  &nbsp;*/}
        {/*</div>*/}

        {/* Show current project */}
        {/*<div style={{ position: 'fixed', left: '260px', top: '33px', width: 'calc(100% - 260px)',*/}
        {/*     height: '36px', backgroundColor: '#333', borderBottom: '1px solid #555', padding: '4px' }}*/}
        {/*     className={'bg-white dark:bg-gray-900 text-black dark:text-gray-200'}>*/}
        {/*  <Stack direction={'row'}>*/}
        {/*    <div style={{ width: '50%', textAlign: 'left', padding: '4px' }}>*/}
        {/*      <Typography style={{ fontWeight: 200, fontSize: 13 }}>*/}
        {/*        Default*/}
        {/*      </Typography>*/}
        {/*    </div>*/}

        {/*    <div style={{ width: '50%', textAlign: 'right', paddingRight: '6px' }}>*/}
        {/*      <Button style={{*/}
        {/*        height: '24px', backgroundColor: '#ccc', borderRadius: 2,*/}
        {/*        color: 'black', border: '1px solid #fff', paddingLeft: '6px', paddingRight: '6px' }}*/}
        {/*              variant={'contained'} startIcon={<HelpIcon/>}*/}
        {/*              onClick={() => window.open('https://docs.objectified.dev', '_none')}>*/}
        {/*        <Typography style={{ fontWeight: 150, fontSize: 12, }} textTransform={'none'}>*/}
        {/*          Help*/}
        {/*        </Typography>*/}
        {/*      </Button>*/}
        {/*    </div>*/}
        {/*  </Stack>*/}
        {/*</div>*/}

        {/*Main Navigation area*/}
        <div style={{ position: 'fixed',
          left: '260px',
          top: '33px',
          width: 'calc(100% - 260px)',
          height: 'calc(100% - 33px)',
          backgroundColor: '#fff',
          color: '#000',
          overflowY: 'auto',
        }}>
          <div style={{ width: '100%', height: '36px', borderBottom: '1px solid #ccc', padding: '4px' }}
               className={'bg-white text-black font-light'}>
            <Stack direction={'row'}>
              <div style={{ width: '50%', textAlign: 'left', padding: '4px' }}>
                <Typography style={{ fontWeight: 200, fontSize: 13 }}>
                  Default
                </Typography>
              </div>

              <div style={{ width: '50%', textAlign: 'right', paddingRight: '6px' }}>
                <Button style={{
                  height: '24px', backgroundColor: '#ccc', borderRadius: 2,
                  color: 'black', border: '1px solid #fff', paddingLeft: '6px', paddingRight: '6px' }}
                        variant={'contained'} startIcon={<HelpIcon/>}
                        onClick={() => window.open('https://docs.objectified.dev', '_none')}>
                  <Typography style={{ fontSize: 12, }} className={'font-thin'} textTransform={'none'}>
                    Help
                  </Typography>
                </Button>
              </div>
            </Stack>
          </div>

          <div style={{ position: 'fixed', width: '130px', height: 'calc(100% - 68px)', borderRight: '1px solid #ccc',
          backgroundColor: '#eee'}}>
            <MenuList style={{ padding: '0px' }} dense>
              {NavItems.map((x) => (
                <ListItemButton style={{ paddingTop: '2px', paddingBottom: '2px' }}
                  onClick={() => router.push(x.url)}>
                  <ListItemText>
                    <Typography style={{ fontSize: 12 }} className={'font-thin'}>
                      {x.label}
                    </Typography>
                  </ListItemText>
                </ListItemButton>
              ))}
            </MenuList>
          </div>

          <div style={{ position: 'fixed', width: '100%', left: '390px', height: 'calc(100% - 68)', width: 'calc(100% - 390px)' }}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
