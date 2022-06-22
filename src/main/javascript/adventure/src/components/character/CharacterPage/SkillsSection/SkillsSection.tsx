import React from "react";

import {Box, Typography} from "@mui/material";

import CharacterAttribute from "../../CharacterAttribute";
import "./SkillsSection.css";
import AlcheimTextField from "../../../input/AlcheimTextField";

type CharacterValue = { name: string, value: number, minimum: number, maximum: number };
type CharacterSkills = { [key: string]: CharacterValue }
type Character = { skills: CharacterSkills };
type SkillsSectionProps = { character: Character, setCharacter: (character: Character) => void, isEditing: boolean };

const newSkill = (skillName: string) => ({name: skillName, value: 0, minimum: 0, maximum: 5});

type Named = { name: string };
const byName = (a: Named, b: Named) => a.name.localeCompare(b.name);

type Ranked = { value: number }

const byRank = (a: Ranked, b: Ranked) => b.value - a.value;

type RankedNamed = Ranked & Named;
const byRankThenName = (a: RankedNamed, b: RankedNamed) => {
  const rank = byRank(a, b);
  return rank === 0 ? byName(a, b) : rank;
}

const SkillsSection = (props: SkillsSectionProps) => {

  const {character, setCharacter, isEditing} = props;

  const characterPageState = {character, setCharacter, isEditing};

  const skills = character.skills;

  const setSkills = (skills: CharacterSkills) => setCharacter({...character, skills});

  const setSkillValue = (skillName: string) => {
    return (value: number) => {
      character.skills[skillName].value = value;
      setCharacter({...character});
    }
  }

  return (
    <Box p={1}>
      <Typography variant="h5">Skills</Typography>

      <Box display="flex" flexWrap="wrap" flexDirection={"column"}>
        <ul className={"character-skills-list"}>

          {Object.values(skills || {})
            .filter((skill: CharacterValue) => isEditing || skill.value > 0)
            .sort(byRankThenName)
            .map((characterValue) =>
              <li>
                <CharacterAttribute
                  isEditing={isEditing}
                  valueName={characterValue.name}
                  characterValue={characterValue}
                  setValue={setSkillValue(characterValue.name)}
                />
              </li>
            )}

          {isEditing && <li>
            <AlcheimTextField
              label={"Add new skill"}
              onKeyDown={(e: any) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const skillName = e.target.value.toLowerCase();
                  const skillsCopy = {...skills};
                  skillsCopy[skillName] = newSkill(skillName);
                  setSkills(skillsCopy);
                  e.target.value = "";
                }
              }}
            /></li>}

        </ul>
      </Box>

    </Box>
  );
}

export default SkillsSection;
