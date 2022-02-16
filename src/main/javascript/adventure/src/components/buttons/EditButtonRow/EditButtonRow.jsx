import './EditButtonRow.css';

import {ButtonGroup} from '@material-ui/core';
import DeleteButton from '../DeleteButton';
import CancelButton from '../CancelButton';
import SaveButton from '../SaveButton';
import EditButton from '../EditButton';

const EditButtonRow = ({isEditing, onDelete, onCancelEdit, onSave, onEdit}) => <ButtonGroup
  className={'edit-button-row'}>
  {isEditing && <DeleteButton onClick={onDelete}/>}
  {isEditing && <SaveButton onClick={onSave}/>}
  {isEditing && <CancelButton onClick={onCancelEdit}/>}
  {!isEditing && <EditButton onClick={onEdit}/>}
</ButtonGroup>;

export default EditButtonRow;
