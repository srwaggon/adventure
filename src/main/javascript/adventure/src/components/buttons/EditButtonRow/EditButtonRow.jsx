import "./EditButtonRow.css";

import {ButtonGroup} from "@mui/material";
import DeleteButton from "../DeleteButton";
import CancelButton from "../CancelButton";
import SaveButton from "../SaveButton";
import EditButton from "../EditButton";
import CopyButton from "../CopyButton.tsx";

const EditButtonRow = ({isEditing, onDelete, onCopy, onCancelEdit, onSave, onEdit}) =>
  <ButtonGroup
    className={"edit-button-row"}>
    {isEditing && onDelete && <DeleteButton onClick={onDelete}/>}
    {isEditing && onCopy && <CopyButton onClick={onCopy}/>}
    {isEditing && onSave && <SaveButton onClick={onSave}/>}
    {isEditing && <CancelButton onClick={onCancelEdit}/>}
    {!isEditing && <EditButton onClick={onEdit}/>}
  </ButtonGroup>;

export default EditButtonRow;
