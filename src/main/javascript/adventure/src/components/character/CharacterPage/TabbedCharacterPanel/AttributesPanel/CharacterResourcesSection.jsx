import React, {useState} from "react";
import {replaceCharacter} from "../../../../../utilities/client";
import {Box, Typography} from "@mui/material";
import {Row} from "../../../../Row/Row";
import EditButtonRow from "../../../../buttons/EditButtonRow/EditButtonRow";
import {CharacterResource} from "./CharacterResource";
import {copyCharacterProperties, isResourceWithName} from "../../../../../property";

export const CharacterResourcesSection = ({character, setCharacter}) => {
  const [properties, setProperties] = useState(copyCharacterProperties(character));

  const [isEditing, setIsEditing] = useState(false);

  const onCancelEdit = () => {
    setIsEditing(false);
    setProperties(copyCharacterProperties(character));
  };

  const onSave = () => {
    setIsEditing(false);
    replaceCharacter({...character, properties: properties})
      .then(response => response.json())
      .then(character => {
        setCharacter(character);
      });
  };

  return <Box p={1}>
    <Row>
      <Typography variant="h5">Resources</Typography>
      <EditButtonRow
        onEdit={() => setIsEditing(true)}
        onCancelEdit={onCancelEdit}
        onSave={onSave}
      />
    </Row>
    <CharacterResource
      {...{
        character,
        setCharacter,
        isEditing,
        properties,
        setProperties,
      }}
      resource={character.properties.find(isResourceWithName('health'))}
    />
    <CharacterResource
      {...{
        character,
        setCharacter,
        isEditing,
        properties,
        setProperties,
      }}
      resource={character.properties.find(isResourceWithName('stamina'))}
    />
    <CharacterResource
      {...{
        character,
        setCharacter,
        isEditing,
        properties,
        setProperties,
      }}
      resource={character.properties.find(isResourceWithName('charge'))}
    />
  </Box>;
};
