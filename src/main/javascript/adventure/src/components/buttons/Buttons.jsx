import {Box, IconButton} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FaceIcon from "@mui/icons-material/Face";
import MenuIcon from "@mui/icons-material/Menu";

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
  return (
    <Box>
      <IconButton
        aria-label={"cancel"}
        color={"default"}
        disabled={disabled}
        onClick={onClick}
        className={className}
        size="large">
        {children}
      </IconButton>
    </Box>
  );
};
