import React from "react";

import {Box, Typography} from "@mui/material";

import CharacterAttribute from "../../CharacterAttribute";
import "./SkillsSection.css";

type CharacterValue = { name: string, value: number, minimum: number, maximum: number };
type Character = any;
type SkillsSectionProps = { character: Character, setCharacter: (character: Character) => void, isEditing: boolean };

const SkillsSection = (props: SkillsSectionProps) => {

  const {character, setCharacter, isEditing} = props;

  const characterPageState = {character, setCharacter, isEditing};

  return (
    <Box p={1}>
      <Typography variant="h5">Skills</Typography>

      <Box display="flex" flexWrap="wrap" flexDirection={"column"}>
        <ul className={"character-skills-list"}>

          {(character.skills || [])
            .filter((value: number) => isEditing || value > 0)
            .map(({name, value, minimum, maximum}: CharacterValue) =>
              <li><CharacterAttribute {...characterPageState} attribute={name}/></li>
            )}

        </ul>
      </Box>
    </Box>
  );
}

export default SkillsSection;
