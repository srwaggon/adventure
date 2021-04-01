import {Box, IconButton} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FaceIcon from '@material-ui/icons/Face';
import MenuIcon from '@material-ui/icons/Menu';

export const AccountCircleButton = ({disabled, onClick}) =>
  <StandardIconButton disabled={disabled} onClick={onClick}>
    <AccountCircleIcon/>
  </StandardIconButton>;

export const ChevronRightButton = ({disabled, onClick}) =>
  <StandardIconButton disabled={disabled} onClick={onClick}>
    <ChevronRightIcon/>
  </StandardIconButton>;

export const FaceButton = ({disabled, onClick}) =>
  <StandardIconButton disabled={disabled} onClick={onClick}>
    <FaceIcon/>
  </StandardIconButton>;

export const MenuButton = ({disabled, onClick}) =>
  <StandardIconButton disabled={disabled} onClick={onClick}>
    <MenuIcon/>
  </StandardIconButton>;

const StandardIconButton = ({children, disabled, onClick}) => {
  return <Box>
    <IconButton
      aria-label={'cancel'}
      color={'default'}
      disabled={disabled}
      onClick={onClick}>
      {children}
    </IconButton>
  </Box>;
};