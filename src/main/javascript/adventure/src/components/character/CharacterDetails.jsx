import React from "react";

import {Box, Card, CardContent, Divider, Typography} from "@mui/material";

import CharacterPortraitCard from "./CharacterPortraitCard/CharacterPortraitCard";
import useProficiencies from "../proficiency/UseProficiencies";
import EditCharacterNameTextField from "./CharacterPage/EditCharacterNameTextField";
import CharacterAttribute from "./CharacterAttribute";
import CharacterResource from "./CharacterResource";
import ProficiencyChip from "./ProficiencyChip";

import SkillsSection from "./CharacterPage/SkillsSection/SkillsSection";

const CharacterAttributesSection = ({characterPageState}) => {
  return <Box p={1}>
    <Typography variant="h5">Attributes</Typography>
    <Box display="flex" flexWrap="wrap">
      <Box pr={2}>
        <CharacterAttribute {...characterPageState} attribute={"strength"}/>
        <CharacterAttribute {...characterPageState} attribute={"dexterity"}/>
        <CharacterAttribute {...characterPageState} attribute={"constitution"}/>
      </Box>
      <Box pr={2}>
        <CharacterAttribute {...characterPageState} attribute={"presence"}/>
        <CharacterAttribute {...characterPageState} attribute={"influence"}/>
        <CharacterAttribute {...characterPageState} attribute={"composure"}/>
      </Box>
      <Box pr={2}>
        <CharacterAttribute {...characterPageState} attribute={"intelligence"}/>
        <CharacterAttribute {...characterPageState} attribute={"wits"}/>
        <CharacterAttribute {...characterPageState} attribute={"resolve"}/>
      </Box>
    </Box>
  </Box>;
}

const CharacterResourcesSection = ({characterPageState}) => {
  return <Box p={1}>
    <Typography variant="h5">Resources</Typography>
    <Box display="flex" flexWrap="wrap">
      <Box pr={"16px"}><CharacterResource {...characterPageState} resource={"stamina"}/></Box>
      <Box pr={"16px"}><CharacterResource {...characterPageState} resource={"confidence"}/></Box>
      <Box pr={"16px"}><CharacterResource {...characterPageState} resource={"focus"}/></Box>
      <Box pr={"16px"}><CharacterResource {...characterPageState} resource={"health"}/></Box>
      <Box pr={"16px"}><CharacterResource {...characterPageState} resource={"reputation"}/></Box>
      <Box pr={"16px"}><CharacterResource {...characterPageState} resource={"mana"}/></Box>
    </Box>
  </Box>;

}

const ProficienciesSection = ({characterPageState}) => {
  const proficiencies = useProficiencies();
  return <Box p={1}>
    <Typography variant="h5">Proficiencies</Typography>
    <Box display="flex" flexWrap="wrap" flexDirection={"row"}>
      {proficiencies.map(proficiency =>
        <ProficiencyChip {...characterPageState} proficiency={proficiency}/>)}
    </Box>
  </Box>;
};

const CharacterDetails = ({character, setCharacter, isEditing}) => {

  const characterPageState = {character, setCharacter, isEditing};

  return <Box>
    <Box display="flex" flexDirection="row-reverse" flexWrap="wrap" justifyContent="space-between">
      <Box display="flex" flexGrow={1} justifyContent="center">
        <Box display="block">
          <CharacterPortraitCard {...characterPageState} {...character}/>
        </Box>
      </Box>

      <Box display="flex" flexGrow={1} justifyContent="center">
        <Card><CardContent>

          <Box maxWidth={844}>

            <Box display="flex" flexGrow={3} p={1}>
              {isEditing
                ? <EditCharacterNameTextField character={character} setCharacter={setCharacter}/>
                : <Typography align="center" variant={"h3"}>{character.name}</Typography>}
            </Box>

            <Divider/>

            <CharacterAttributesSection {...{characterPageState}}/>

            <Divider/>

            <CharacterResourcesSection {...{characterPageState}}/>

            <Divider/>

            <ProficienciesSection {...{characterPageState}}/>

            <Divider/>

            <SkillsSection {...characterPageState}/>
          </Box>

        </CardContent></Card>
      </Box>

    </Box>
  </Box>;
};

export default CharacterDetails;
