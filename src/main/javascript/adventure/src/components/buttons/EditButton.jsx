import {Box, IconButton} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

const EditButton = ({disabled, onClick}) => {
  return <Box>
    <IconButton
      aria-label={'edit'}
      color={'default'}
      disabled={disabled}
      onClick={onClick}>
      <EditIcon/>
    </IconButton>
  </Box>;
};

export default EditButton;