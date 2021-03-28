import {Box, IconButton} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

const CancelButton = ({disabled, onClick}) => {
  return <Box>
    <IconButton
      aria-label={'cancel'}
      color={'default'}
      disabled={disabled}
      onClick={onClick}>
      <CancelIcon/>
    </IconButton>
  </Box>;
};

export default CancelButton;