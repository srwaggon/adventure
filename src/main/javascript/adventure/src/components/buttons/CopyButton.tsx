import {Box, IconButton} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {MouseEventHandler} from "react";

const CopyButton = ({disabled, onClick}: { disabled: boolean, onClick: MouseEventHandler<HTMLButtonElement> | undefined }) => {
  return (
    <Box>
      <IconButton
        aria-label={"save"}
        color={"primary"}
        disabled={disabled}
        onClick={onClick}
        size="large">
        <ContentCopyIcon/>
      </IconButton>
    </Box>
  );
};

export default CopyButton;
