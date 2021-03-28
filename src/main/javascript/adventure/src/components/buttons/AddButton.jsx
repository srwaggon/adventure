import {Box, IconButton} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const AddButton = ({onClick}) => {
  return <Box>
    <IconButton
      aria-label={'add'}
      color={'default'}
      onClick={onClick}>
      <AddCircleIcon/>
    </IconButton>
  </Box>;
};

export default AddButton;