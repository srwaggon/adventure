import {Box, IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const EditButton = ({disabled, onClick}) => {
  return (
    <Box>
      <IconButton
        aria-label={"edit"}
        color={"default"}
        disabled={disabled}
        onClick={onClick}
        size="large">
        <EditIcon/>
      </IconButton>
    </Box>
  );
};

export default EditButton;
