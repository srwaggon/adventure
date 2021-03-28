import {Box, IconButton} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const AddButton = ({disabled, onClick}) => {
  return <Box>
    <IconButton
      aria-label={'add'}
      color={'default'}
      disabled={disabled}
      onClick={onClick}>
      <AddCircleIcon/>
    </IconButton>
  </Box>;
};

export default AddButton;