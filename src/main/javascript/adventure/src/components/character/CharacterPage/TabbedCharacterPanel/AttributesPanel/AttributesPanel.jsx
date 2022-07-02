import React from "react";
import {Box, Divider, Typography} from "@mui/material";
import {CharacterResource} from "./CharacterResource";
import {CharacterAttribute} from "./CharacterAttribute";

import "./AttributesPanel.css"

export const ATTRIBUTES_TAB = "attributes";
export const AttributesPanel = ({character, setCharacter, isEditing, selectedTab}) => {
  return selectedTab === ATTRIBUTES_TAB && <>
    <CharacterAttributesSection {...{character, setCharacter, isEditing}}/>

    <Divider/>

    <CharacterResourcesSection {...{character, setCharacter, isEditing}}/>
  </>;
};

const CharacterAttributesSection = (props) => {

  const {character, setCharacter, isEditing} = props;

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

  return <Box p={1}>
    <Typography variant="h5">Attributes</Typography>
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

const CharacterResourcesSection = ({character, setCharacter, isEditing}) => {
  return <Box p={1}>
    <Typography variant="h5">Resources</Typography>
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
