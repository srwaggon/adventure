import {Box, IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const DeleteButton = ({onClick}) => {
  return <Box>
    <IconButton
      aria-label={'delete'}
      color={'secondary'}
      onClick={onClick}>
      <DeleteIcon/>
    </IconButton>
  </Box>;
};

export default DeleteButton;