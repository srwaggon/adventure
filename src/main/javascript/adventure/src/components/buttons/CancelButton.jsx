import {Box, IconButton} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

const CancelButton = ({disabled, onClick}) => {
  return (
    <Box>
      <IconButton
        aria-label={"cancel"}
        color={"default"}
        disabled={disabled}
        onClick={onClick}
        size="large">
        <CancelIcon/>
      </IconButton>
    </Box>
  );
};

export default CancelButton;
