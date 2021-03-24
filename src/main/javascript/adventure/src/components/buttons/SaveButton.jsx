import {IconButton} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

const SaveButton = ({onClick}) => {
  return <IconButton
    aria-label={'save'}
    variant={'contained'}
    color={'primary'}
    onClick={onClick}>
    <SaveIcon/>
  </IconButton>;
};

export default SaveButton;