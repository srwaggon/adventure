import {Box, IconButton} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

const SaveButton = ({disabled, onClick}) => {
  return (
    <Box>
      <IconButton
        aria-label={"save"}
        color={"primary"}
        disabled={disabled}
        onClick={onClick}
        size="large">
        <SaveIcon/>
      </IconButton>
    </Box>
  );
};

export default SaveButton;
