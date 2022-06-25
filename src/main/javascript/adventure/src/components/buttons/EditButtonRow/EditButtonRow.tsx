import "./EditButtonRow.css";

import {ButtonGroup} from "@mui/material";
import DeleteButton from "../DeleteButton";
import CancelButton from "../CancelButton";
import SaveButton from "../SaveButton";
import EditButton from "../EditButton";
import CopyButton from "../CopyButton";

type EditButtonRowParams = {
  isEditing: boolean,
  onCancelEdit: () => void,
  onCopy?: () => void,
  onDelete?: () => void,
  onSave?: () => void,
  onEdit: () => void
}

const EditButtonRow = ({
  isEditing,
  onCancelEdit,
  onCopy,
  onDelete,
  onEdit,
  onSave
}: EditButtonRowParams) => {
  return <ButtonGroup
    className={"edit-button-row"}>
    {isEditing && onDelete && <DeleteButton onClick={onDelete}/>}
    {isEditing && onCopy && <CopyButton onClick={onCopy}/>}
    {isEditing && onSave && <SaveButton onClick={onSave}/>}
    {isEditing && <CancelButton onClick={onCancelEdit}/>}
    {!isEditing && <EditButton onClick={onEdit}/>}
  </ButtonGroup>;
};

export default EditButtonRow;
