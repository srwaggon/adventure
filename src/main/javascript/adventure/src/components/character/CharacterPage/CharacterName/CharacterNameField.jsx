import React, {useState} from "react";
import {Row} from "../../../Row/Row";
import {EditCharacterNameTextField} from "./EditCharacterNameTextField";
import {Typography} from "@mui/material";
import EditButtonRow from "../../../buttons/EditButtonRow/EditButtonRow";

export const CharacterNameField = ({
  name,
  setName,
  onSave
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const onEdit = () => {
    setIsEditing(true);
  }

  const internalOnSave = () => {
    setIsEditing(false);
    onSave();
  }
  const onCancel = () => {
    setIsEditing(false);
  }
  return <>
    <Row>
      {isEditing
        ? <EditCharacterNameTextField name={name} setName={setName}/>
        : <Typography align="center" variant={"h3"}>{name}</Typography>
      }
      <EditButtonRow onEdit={onEdit} onSave={internalOnSave} onCancelEdit={onCancel}/>
    </Row>
  </>;
}
