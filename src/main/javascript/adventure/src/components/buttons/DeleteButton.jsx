import {IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const DeleteButton = ({onClick}) => {
  return <IconButton
    aria-label={'delete'}
    color={'secondary'}
    onClick={onClick}>
    <DeleteIcon fontSize="small"/>
  </IconButton>;
};

export default DeleteButton;