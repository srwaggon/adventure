import {Box, IconButton} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {MouseEventHandler} from "react";

type CopyButtonParams = { disabled?: boolean, onClick: MouseEventHandler<HTMLButtonElement> | undefined };

const CopyButton = ({disabled = false, onClick}: CopyButtonParams) => {
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
