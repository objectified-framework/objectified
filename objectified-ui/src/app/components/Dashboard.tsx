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
import {usePathname, useRouter} from 'next/navigation';
import {useState} from "react";
import ProfileForm from "@/app/components/profile/ProfileForm";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FolderIcon from '@mui/icons-material/Folder';
import ReorderIcon from '@mui/icons-material/Reorder';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import TenantSelector from "@/app/components/common/TenantSelector";
import MenuButton from "@/app/components/common/MenuButton";
import {putUser} from "@/app/services/user";
import {errorDialog} from "@/app/components/common/ConfirmDialog";

const VERSION = '0.1.4';

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
  // @ts-ignore
  const menuOptions: MenuOption[] = [
    {
      label: 'Profile',
      icon: <SettingsIcon fontSize="small" />,
      onClick: () => setProfileShowing(true),
    },
    {
      label: 'Logout',
      icon: <LogoutIcon fontSize="small" />,
      onClick: () => {
        setLogoutShowing(true);
        signOut();
      }
    }
  ];

  const {data: session, status, update} = useSession();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [logoutShowing, setLogoutShowing] = useState(false);
  const [profileShowing, setProfileShowing] = useState(false);
  const currentPath: string = usePathname();

  if (status === 'unauthenticated') {
    return (<>
      {children}
    </>);
  }

  if (status === 'loading') {
    return (<></>);
  }

  const selectedColor = (path: string) => (currentPath.startsWith(path) ? 'bg-blue-300' : '');
  const handleTenantChanged = async (tenantId: string) => {
    let currentData = (session as any).objectified;

    if (!currentData.data) {
      currentData.data = {};
    }

    currentData.data.selectedTenant = tenantId;

    await putUser((session as any).objectified.id, currentData.data)
      .then((x) => {
        update({ currentTenant: tenantId });
      }).catch((x) => {
        errorDialog(`Failed to save your profile: ${x}`);
      });
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
        }} className={'bg-slate-300 text-black font-light'}>
          <Stack direction={'row'}>
            <div style={{ width: '50%', textAlign: 'left' }}>
              <Stack direction={'row'}>
                <img src={'/Objectified-02.png'} style={{ height: '32px', width: '110px' }}/>
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
              <MenuButton buttonText={`${session?.user?.emailAddress ?? 'Unregistered User'}`}
                          menuOptions={menuOptions}
                          startIcon={<PersonIcon/>}
                          endIcon={<ExpandMoreIcon/>}
                          className={'font-light text-white text-xs'}
                          menuClassName={'font-light text-black text-sm'}
                          style={{
                            height: '24px', backgroundColor: '#333', borderRadius: 2,
                            color: 'white', border: '1px solid #fff', paddingLeft: '6px', paddingRight: '6px',
                            fontWeight: 150, fontSize: 12,
                          }}/>
            </div>
          </Stack>
        </div>

        <div style={{ position: 'fixed', top: '32px', width: '260px', height: 'calc(100% - 32px)' }}
             className={'bg-slate-300 text-black font-light'}>
          <Stack direction={'column'}>
            <div style={{ width: '100%' }}>
              <TenantSelector onTenantChanged={handleTenantChanged}/>
            </div>
          </Stack>

          <div style={{ width: '100%', height: '100%', paddingLeft: '8px', paddingRight: '8px', paddingBottom: '40px' }}
               className={'bg-slate-300 text-black'}>
            <div style={{ width: '100%', height: '100%' }}
                 className={'bg-white'}>
              <MenuList style={{ padding: '0px' }}>
                <MenuItem style={{ padding: '0px 10px 1px 1px' }}>
                  <ListItemIcon sx={{ padding: '0px' }}>
                    <ExpandMoreIcon style={{ width: '18px', height: '18px' }}/>
                    <ReorderIcon style={{ width: '18px', height: '18px' }}/>
                  </ListItemIcon>
                  <ListItemText>
                    <Typography className={'text-sm font-extralight'} style={{ paddingLeft: '10px' }}>
                      Projects
                    </Typography>
                  </ListItemText>
                </MenuItem>
                <MenuItem style={{ padding: '0px 10px 1px 32px', border: '1px solid #00f' }}
                          className={'text-sm font-extralight bg-blue-300'}>
                  <ListItemIcon>
                    <FolderIcon style={{ width: '18px', height: '18px' }}/>
                  </ListItemIcon>
                  <Typography className={'text-sm font-extralight'}>
                    Default
                  </Typography>
                </MenuItem>
              </MenuList>
            </div>
          </div>
        </div>

        {/*Main Navigation area*/}
        <div style={{ position: 'fixed',
          left: '260px',
          top: '32px',
          width: 'calc(100% - 260px)',
          height: 'calc(100% - 32px)',
          backgroundColor: '#fff',
          color: '#000',
          overflowY: 'auto',
        }}>
          <div style={{ width: '100%', height: '36px', borderBottom: '1px solid #ccc', padding: '4px' }}
               className={'bg-white text-black font-light'}>
            <Stack direction={'row'}>
              <div style={{ width: '50%', textAlign: 'left', padding: '4px' }}>
                <Typography className={'font-thin text-sm'}>
                  Default
                </Typography>
              </div>
            </Stack>
          </div>

          <div style={{ position: 'fixed', width: '130px', height: 'calc(100% - 68px)', borderRight: '1px solid #ccc' }}
               className={'bg-slate-100'}>
            <MenuList style={{ padding: '0px' }} dense>
              {NavItems.map((x) => (
                <ListItemButton style={{ padding: '0px', paddingLeft: '10px', }}
                  onClick={() => router.push(x.url)}
                  className={`${selectedColor(x.url)}`}>
                  <ListItemText>
                    <Typography className={'font-thin text-sm'}>
                      {x.label}
                    </Typography>
                  </ListItemText>
                </ListItemButton>
              ))}
            </MenuList>
          </div>

          <div style={{
            position: 'fixed', left: '390px', height: 'calc(100% - 68px)', width: 'calc(100% - 390px)', overflowY: 'auto'
          }}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
