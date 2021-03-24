import {IconButton} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

const EditButton = ({onClick}) => {
  return <IconButton
    aria-label={'edit'}
    color={'default'}
    onClick={onClick}>
    <EditIcon/>
  </IconButton>;
};

export default EditButton;