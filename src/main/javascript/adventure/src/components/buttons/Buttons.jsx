import {Box, IconButton} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FaceIcon from '@material-ui/icons/Face';
import MenuIcon from '@material-ui/icons/Menu';

export const AccountCircleButton = ({disabled, onClick, className}) =>
  <StandardIconButton disabled={disabled} onClick={onClick} className={className}>
    <AccountCircleIcon/>
  </StandardIconButton>;

export const ChevronLeftButton = ({disabled, onClick, className}) =>
  <StandardIconButton disabled={disabled} onClick={onClick} className={className}>
    <ChevronLeftIcon/>
  </StandardIconButton>;

export const ChevronRightButton = ({disabled, onClick, className}) =>
  <StandardIconButton disabled={disabled} onClick={onClick} className={className}>
    <ChevronRightIcon/>
  </StandardIconButton>;

export const FaceButton = ({disabled, onClick, className}) =>
  <StandardIconButton disabled={disabled} onClick={onClick} className={className}>
    <FaceIcon/>
  </StandardIconButton>;

export const MenuButton = ({disabled, onClick, className}) =>
  <StandardIconButton
    disabled={disabled}
    onClick={onClick}
    className={className}
  >
    <MenuIcon/>
  </StandardIconButton>;

const StandardIconButton = ({children, disabled, onClick, className}) => {
  return <Box>
    <IconButton
      aria-label={'cancel'}
      color={'default'}
      disabled={disabled}
      onClick={onClick}
      className={className}
    >
      {children}
    </IconButton>
  </Box>;
};
