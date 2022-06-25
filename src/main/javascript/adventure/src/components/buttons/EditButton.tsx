import {Box, IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {MouseEventHandler} from "react";

type EditButtonParams = { disabled?: boolean, onClick: MouseEventHandler<HTMLButtonElement> | undefined };

const EditButton = ({disabled, onClick}: EditButtonParams) => {
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
