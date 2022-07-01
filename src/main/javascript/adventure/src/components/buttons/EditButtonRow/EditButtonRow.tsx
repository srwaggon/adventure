import {ButtonGroup} from "@mui/material";
import {useState} from "react";
import CancelButton from "../CancelButton";
import CopyButton from "../CopyButton";
import DeleteButton from "../DeleteButton";
import EditButton from "../EditButton";
import SaveButton from "../SaveButton";
import "./EditButtonRow.css";

type EditButtonRowParams = {
  isEditing?: boolean,
  onCancelEdit: () => void,
  onCopy?: () => void,
  onDelete?: () => void,
  onSave?: () => void,
  onEdit: () => void
}

const EditButtonRow = ({
  onCancelEdit,
  onCopy,
  onDelete,
  onEdit,
  onSave
}: EditButtonRowParams) => {
  const [isEditing, setIsEditing] = useState(false);

  const internalOnCancelEdit = () => {
    setIsEditing(false);
    onCancelEdit();
  }
  const internalOnCopy = () => {
    setIsEditing(false);
    onCopy && onCopy();
  }
  const internalOnDelete = () => {
    setIsEditing(false);
    onDelete && onDelete();
  }
  const internalOnEdit = () => {
    setIsEditing(true);
    onEdit && onEdit();
  }
  const internalOnSave = () => {
    setIsEditing(false);
    onSave && onSave();
  }

  return <ButtonGroup
    className={"edit-button-row"}>
    {isEditing && onDelete && <DeleteButton onClick={internalOnDelete}/>}
    {isEditing && onCopy && <CopyButton onClick={internalOnCopy}/>}
    {isEditing && onSave && <SaveButton onClick={internalOnSave}/>}
    {isEditing && <CancelButton onClick={internalOnCancelEdit}/>}
    {!isEditing && <EditButton onClick={internalOnEdit}/>}
  </ButtonGroup>;
};

export default EditButtonRow;
