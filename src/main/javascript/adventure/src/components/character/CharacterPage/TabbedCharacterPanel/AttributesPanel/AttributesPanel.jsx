import React from "react";
import {Box, Divider, Typography} from "@mui/material";
import {CharacterResource} from "./CharacterResource";
import {CharacterAttribute} from "./CharacterAttribute/CharacterAttribute";

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

  const ActuallyCharacterAttribute = ({valueName}) => {

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
    <Box display="flex" flexWrap="wrap">
      <Box pr={2}>
        <ActuallyCharacterAttribute valueName={"strength"}/>
        <ActuallyCharacterAttribute valueName={"dexterity"}/>
        <ActuallyCharacterAttribute valueName={"constitution"}/>
      </Box>
      <Box pr={2}>
        <ActuallyCharacterAttribute valueName={"presence"}/>
        <ActuallyCharacterAttribute valueName={"influence"}/>
        <ActuallyCharacterAttribute valueName={"composure"}/>
      </Box>
      <Box pr={2}>
        <ActuallyCharacterAttribute valueName={"intelligence"}/>
        <ActuallyCharacterAttribute valueName={"wits"}/>
        <ActuallyCharacterAttribute valueName={"resolve"}/>
      </Box>
    </Box>
  </Box>;
}

const CharacterResourcesSection = ({character, setCharacter, isEditing}) => {
  return <Box p={1}>
    <Typography variant="h5">Resources</Typography>
    <Box display="flex" flexWrap="wrap">
      <Box pr={"16px"}><CharacterResource {...{character, setCharacter, isEditing}} resource={"stamina"}/></Box>
      <Box pr={"16px"}><CharacterResource {...{character, setCharacter, isEditing}} resource={"confidence"}/></Box>
      <Box pr={"16px"}><CharacterResource {...{character, setCharacter, isEditing}} resource={"focus"}/></Box>
      <Box pr={"16px"}><CharacterResource {...{character, setCharacter, isEditing}} resource={"health"}/></Box>
      <Box pr={"16px"}><CharacterResource {...{character, setCharacter, isEditing}} resource={"reputation"}/></Box>
      <Box pr={"16px"}><CharacterResource {...{character, setCharacter, isEditing}} resource={"mana"}/></Box>
    </Box>
  </Box>;
}
