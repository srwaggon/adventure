import {Box, IconButton} from '@material-ui/core';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';

const BrokenImageButton = ({disabled, onClick}) => {
  return <Box>
    <IconButton
      aria-label={'damage'}
      color={'default'}
      disabled={disabled}
      onClick={onClick}>
      <BrokenImageIcon/>
    </IconButton>
  </Box>;
};

export default BrokenImageButton;