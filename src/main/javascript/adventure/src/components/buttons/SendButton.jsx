import {Box, IconButton} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const SendButton = ({disabled, onClick}) => {
  return <Box>
    <IconButton
      aria-label='send'
      color='default'
      disabled={disabled}
      onClick={onClick}>
      <SendIcon/>
    </IconButton>
  </Box>;
};

export default SendButton;