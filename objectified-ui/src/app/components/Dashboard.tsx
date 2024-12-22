'use client';

import {signIn, signOut, useSession} from "next-auth/react";
import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  Menu,
  MenuItem,
  Stack,
  Typography
} from "@mui/material";
import {useRouter} from "next/navigation";
import {Inter} from "next/font/google";
import SideBar from "@/app/components/SideBar";
import {SideBarMenuItemProps} from "@/app/components/sidebar/SideBarMenuItem";
import {SideBarMenuGroupProps} from "@/app/components/sidebar/SideBarMenuGroup";
import {PersonOutline, PersonOutlined} from "@mui/icons-material";
import {useState} from "react";
import Item from "@/app/components/common/Item";
const inter = Inter({ subsets: ["latin"] });

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  const {data: session, status} = useSession();
  const router = useRouter();
  const [mainLeft, setMainLeft] = useState('260px');
  const [calcWidth, setCalcWidth] = useState('calc(100% - 260px)');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [logoutShowing, setLogoutShowing] = useState(false);
  const open = Boolean(anchorEl);

  if (status === 'unauthenticated') {
    return (<>
      <html lang="en">
        <body className={inter.className}>
          {children}
        </body>
      </html>
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

      <div style={{ display: 'flex', width: '100%' }}>
        <div style={{ position: 'fixed', width: '260px', backgroundColor: '#ccf', height: 'calc(100%)' }}>
          <SideBar width={260} onHomeClicked={handleHomeClicked}
                   onHamburgerContracted={onHamburgerContracted}
                   onHamburgerExpanded={onHamburgerExpanded}/>
        </div>

        <div style={{ position: 'fixed', width: calcWidth, left: mainLeft, backgroundColor: '#000', height: '52px' }}>
          <Stack direction={'row'} spacing={2} sx={{ textAlign: 'right' }}>
            <Item sx={{ width: '100%', textAlign: 'right', padding: '0px', backgroundColor: '#000' }}>
              <Button sx={{ padding: '2px'}}
                      onClick={handleClick}
                      aria-controls={open ? 'simple-menu' : undefined}
                      aria-haspopup={'true'}
                      aria-expanded={open ? 'true' : undefined}>
                <Avatar alt={session.user.name} src={session.user.image}/>
              </Button>
              <Menu id={'simple-menu'} anchorEl={anchorEl} open={open} onClose={handleClose}
                    MenuListProps={{ 'aria-labelledby': 'basic-button', }}>
                <MenuItem onClick={handleClose}>Settings</MenuItem>
                <MenuItem onClick={() => {
                  handleClose();
                  setLogoutShowing(true);
                  signOut({
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
            overflowY: 'inherit',
          }}>
          {children}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
