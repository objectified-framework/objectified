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
import TenantSelector from "@/app/components/common/TenantSelector";
const inter = Inter({ subsets: ["latin"] });

const Dashboard = ({ children }: { children?: React.ReactNode }) => {
  const {data: session, status, update} = useSession();
  const router = useRouter();
  const [mainLeft, setMainLeft] = useState('260px');
  const [calcWidth, setCalcWidth] = useState('calc(100% - 260px)');
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

  const handleHomeClicked = () => router.push('/');
  const onHamburgerContracted = () => {
    setMainLeft('54px');
    setCalcWidth('calc(100% - 54px)');
  }
  const onHamburgerExpanded = () => {
    setMainLeft('260px');
    setCalcWidth('calc(100% - 260px)');
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
        <div style={{ position: 'fixed', width: '260px', backgroundColor: '#ccf', height: 'calc(100%)' }}>
          <SideBar width={260} onHomeClicked={handleHomeClicked}
                   onHamburgerContracted={onHamburgerContracted}
                   onHamburgerExpanded={onHamburgerExpanded}/>
        </div>

        <div style={{ position: 'fixed', width: calcWidth, left: mainLeft, backgroundColor: '#000', height: '52px' }}>
          <Stack direction={'row'} spacing={2} sx={{ textAlign: 'right' }}>
            <Item sx={{ width: '80%', textAlign: 'left', paddingTop: '4px', backgroundColor: '#000',
                        color: '#fff' }}>
              <TenantSelector onTenantChanged={handleTenantChanged}/>
            </Item>

            <Item sx={{ width: '20%', textAlign: 'right', padding: '0px', backgroundColor: '#000' }}>
              <Button sx={{ padding: '2px'}}
                      onClick={handleClick}
                      aria-controls={open ? 'simple-menu' : undefined}
                      aria-haspopup={'true'}
                      aria-expanded={open ? 'true' : undefined}>
                <Avatar alt={`${session?.user?.name}`} src={`${session?.user?.image}`}/>
              </Button>
              {/*// @ts-ignore */}
              <Menu id={'simple-menu'} anchorEl={anchorEl} open={open} onClose={handleClose}
                    MenuListProps={{ 'aria-labelledby': 'basic-button', }}>
                <MenuItem onClick={() => {
                  handleClose();
                  setProfileShowing(true);
                }}>Profile</MenuItem>
                <Divider/>
                <MenuItem onClick={async () => {
                  handleClose();
                  setLogoutShowing(true);
                  await signOut({
                    callbackUrl: '/login',
                    redirect: true,
                  });
                }}>Logout</MenuItem>
              </Menu>
            </Item>
          </Stack>
          &nbsp;
        </div>

        <div style={{ position: 'fixed',
            left: mainLeft,
            top: '46px',
            width: calcWidth,
            height: 'calc(100% - 46px)',
            backgroundColor: '#fff',
            color: '#000',
            overflowY: 'auto',
          }}>
          {children}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
