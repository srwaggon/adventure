import {Box, IconButton} from "@mui/material";
import BrokenImageIcon from "@mui/icons-material/BrokenImage";

const BrokenImageButton = ({disabled, onClick}) => {
  return (
    <Box>
      <IconButton
        aria-label={"damage"}
        color={"default"}
        disabled={disabled}
        onClick={onClick}
        size="large">
        <BrokenImageIcon/>
      </IconButton>
    </Box>
  );
};

export default BrokenImageButton;
