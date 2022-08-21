import SaveIcon from "@mui/icons-material/Save";
import {Box, IconButton} from "@mui/material";
import {MouseEventHandler} from "react";

type SaveButtonParams = { disabled?: boolean, onClick: MouseEventHandler<HTMLButtonElement> | undefined };

const SaveButton = ({disabled, onClick}: SaveButtonParams) => {
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
