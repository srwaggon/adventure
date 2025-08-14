import React, {useState} from "react";
import {copyCharacterProperties, isAttributeWithName} from "../../../../../property";
import {replaceCharacter} from "../../../../../utilities/client";
import {Box, Typography} from "@mui/material";
import {Row} from "../../../../Row/Row";
import EditButtonRow from "../../../../buttons/EditButtonRow/EditButtonRow";
import {AttributeWrapper} from "./AttributeWrapper";

export const CharacterAttributesSection = ({character, setCharacter}) => {

  const [properties, setProperties] = useState(copyCharacterProperties(character));

  const [isEditing, setIsEditing] = useState(false);

  const onEdit = () => {
    setIsEditing(true);
  };

  const onCancelEdit = () => {
    setIsEditing(false);
    setProperties(copyCharacterProperties(character));
  };

  const onSave = () => {
    setIsEditing(false);
    const updatedCharacter = {...character, properties: properties};
    replaceCharacter(updatedCharacter)
      .then(response => response.json())
      .then(character => {
        setCharacter(character);
      });
  };

  return <Box p={1}>
    <Row>
      <Typography variant="h5">Attributes</Typography>
      <EditButtonRow
        onEdit={onEdit}
        onCancelEdit={onCancelEdit}
        onSave={onSave}
      />
    </Row>
    <Row>
      <AttributeWrapper
        {...{isEditing, properties, setProperties}}
        attribute={character.properties.find(isAttributeWithName('strength'))}/>
      <AttributeWrapper
        {...{isEditing, properties, setProperties}}
        attribute={character.properties.find(isAttributeWithName('agility'))}/>
      <AttributeWrapper
        {...{isEditing, properties, setProperties}}
        attribute={character.properties.find(isAttributeWithName('endurance'))}/>
      <AttributeWrapper
        {...{isEditing, properties, setProperties}}
        attribute={character.properties.find(isAttributeWithName('intelligence'))}/>
      <AttributeWrapper
        {...{isEditing, properties, setProperties}}
        attribute={character.properties.find(isAttributeWithName('wisdom'))}/>
      <AttributeWrapper
        {...{isEditing, properties, setProperties}}
        attribute={character.properties.find(isAttributeWithName('charisma'))}/>
      <AttributeWrapper
        {...{isEditing, properties, setProperties}}
        attribute={character.properties.find(isAttributeWithName('luck'))}/>
    </Row>
  </Box>;
};
