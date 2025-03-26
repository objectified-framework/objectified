import React, { useState, MouseEvent } from 'react';
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';

interface MenuOption {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

interface IMenuButton {
  buttonText: string;
  buttonVariant?: 'text' | 'outlined' | 'contained';
  buttonColor?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  menuOptions: MenuOption[];
  style?: any;
  startIcon?: any;
  endIcon?: any;
  className?: string;
  menuClassName?: string;
}

const MenuButton = (props: IMenuButton) => {
  // State to control the menu open/close
  const { buttonText, buttonVariant, buttonColor, menuOptions, style, startIcon, endIcon, className, menuClassName } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Handler for opening the menu
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Handler for closing the menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handler for menu item click
  const handleMenuItemClick = (callback: () => void) => {
    callback();
    handleClose();
  };

  return (
    <>
      <Button
        variant={buttonVariant}
        color={buttonColor}
        onClick={handleClick}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        style={style}
        startIcon={startIcon}
        endIcon={endIcon}
      >
        <Typography textTransform={'none'} className={className}>
          {buttonText}
        </Typography>
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {menuOptions.map((option: MenuOption, index: number) => (
          <MenuItem
            key={index}
            onClick={() => handleMenuItemClick(option.onClick)}
            className={menuClassName}
          >
            {option.icon && <ListItemIcon>{option.icon}</ListItemIcon>}
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default MenuButton;
