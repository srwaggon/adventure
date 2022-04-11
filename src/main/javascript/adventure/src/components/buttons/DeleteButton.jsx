import {Box, IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const DeleteButton = ({
  disabled = false, onClick = () => {
  }
}) => {
  return (
    <Box>
      <IconButton
        aria-label={"delete"}
        color={"secondary"}
        disabled={disabled}
        onClick={onClick}
        size="large">
        <DeleteIcon/>
      </IconButton>
    </Box>
  );
};

export default DeleteButton;
