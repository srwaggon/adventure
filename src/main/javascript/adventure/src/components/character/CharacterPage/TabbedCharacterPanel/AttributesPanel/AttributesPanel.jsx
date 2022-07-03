import React, {useState} from "react";
import {Box, Divider, Typography} from "@mui/material";
import {CharacterResource} from "./CharacterResource";
import {CharacterAttribute} from "./CharacterAttribute";

import "./AttributesPanel.css"
import EditButtonRow from "../../../../buttons/EditButtonRow/EditButtonRow";
import {Row} from "../../../../Row/Row";
import {replaceCharacter} from "../../../../../utilities/client";

export const ATTRIBUTES_TAB = "attributes";
export const AttributesPanel = ({character, setCharacter, selectedTab}) => {
  return selectedTab === ATTRIBUTES_TAB && <>
    <CharacterAttributesSection {...{character, setCharacter}}/>

    <Divider/>

    <CharacterResourcesSection {...{character, setCharacter}}/>
  </>;
};

const CharacterAttributesSection = (props) => {

  const {character, setCharacter} = props;

  const [isEditing, setIsEditing] = useState(false);

  const CharacterAttributeWrapper = ({valueName}) => {

    const setAttributeValue = (attribute) => {
      return (value) => {
        character[attribute].value = value;
        setCharacter({...character});
      }
    }

    return <CharacterAttribute
      isEditing={isEditing}
      valueName={valueName}
      characterValue={character[valueName]}
      setValue={setAttributeValue(valueName)}
    />;
  }

  const onEdit = () => {
    setIsEditing(true);
  };

  const onCancelEdit = () => {
    setIsEditing(false);
    setCharacter({...character});
  };

  const onSave = () => {
    setIsEditing(false);
    replaceCharacter(character)
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
    <ul className={"character-attributes-list"}>
      <li><CharacterAttributeWrapper valueName={"strength"}/></li>
      <li><CharacterAttributeWrapper valueName={"dexterity"}/></li>
      <li><CharacterAttributeWrapper valueName={"constitution"}/></li>
      <li><CharacterAttributeWrapper valueName={"presence"}/></li>
      <li><CharacterAttributeWrapper valueName={"influence"}/></li>
      <li><CharacterAttributeWrapper valueName={"composure"}/></li>
      <li><CharacterAttributeWrapper valueName={"intelligence"}/></li>
      <li><CharacterAttributeWrapper valueName={"wits"}/></li>
      <li><CharacterAttributeWrapper valueName={"resolve"}/></li>
    </ul>
  </Box>;
}

const CharacterResourcesSection = ({character, setCharacter}) => {
  const [isEditing, setIsEditing] = useState(false);

  const onSave = () => {
    setIsEditing(false);
    replaceCharacter(character)
      .then(response => response.json())
      .then(character => {
        setCharacter(character);
      });
  }

  return <Box p={1}>
    <Row>
      <Typography variant="h5">Resources</Typography>
      <EditButtonRow
        onEdit={() => setIsEditing(true)}
        onCancelEdit={() => setIsEditing(false)}
        onSave={onSave}
      />
    </Row>
    <ul className={"character-attributes-list"}>
      <li><CharacterResource {...{character, setCharacter, isEditing}} resource={"health"}/></li>
      <li><CharacterResource {...{character, setCharacter, isEditing}} resource={"stamina"}/></li>
      <li><CharacterResource {...{character, setCharacter, isEditing}} resource={"reputation"}/></li>
      <li><CharacterResource {...{character, setCharacter, isEditing}} resource={"confidence"}/></li>
      <li><CharacterResource {...{character, setCharacter, isEditing}} resource={"mana"}/></li>
      <li><CharacterResource {...{character, setCharacter, isEditing}} resource={"focus"}/></li>
    </ul>
  </Box>;
}
