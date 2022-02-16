import {Box, IconButton} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const AddButton = ({disabled, onClick}) => {
  return (
    <Box>
      <IconButton
        aria-label={"add"}
        color={"default"}
        disabled={disabled}
        onClick={onClick}
        size="large">
        <AddCircleIcon/>
      </IconButton>
    </Box>
  );
};

export default AddButton;
