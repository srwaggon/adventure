import CancelIcon from "@mui/icons-material/Cancel";
import {Box, IconButton} from "@mui/material";
import {MouseEventHandler} from "react";

type CancelButtonParams = { disabled?: boolean, onClick: MouseEventHandler<HTMLButtonElement> | undefined };

const CancelButton = ({disabled, onClick}: CancelButtonParams) => {
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
