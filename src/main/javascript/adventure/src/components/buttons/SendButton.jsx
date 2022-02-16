import {Box, IconButton} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const SendButton = ({disabled, onClick}) => {
  return (
    <Box>
      <IconButton
        aria-label="send"
        color="default"
        disabled={disabled}
        onClick={onClick}
        size="large">
        <SendIcon/>
      </IconButton>
    </Box>
  );
};

export default SendButton;
