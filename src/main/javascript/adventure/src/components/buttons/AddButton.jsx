import {IconButton} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const AddButton = ({onClick}) => {
  return <IconButton
    aria-label={'add'}
    color={'default'}
    onClick={onClick}>
    <AddCircleIcon/>
  </IconButton>;
};

export default AddButton;