import {Box, IconButton} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

const SaveButton = ({disabled, onClick}) => {
  return <Box>
    <IconButton
      aria-label={'save'}
      color={'primary'}
      disabled={disabled}
      onClick={onClick}>
      <SaveIcon/>
    </IconButton>
  </Box>;
};

export default SaveButton;