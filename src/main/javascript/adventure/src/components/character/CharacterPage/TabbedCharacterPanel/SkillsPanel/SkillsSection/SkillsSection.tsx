import {Box, Typography} from "@mui/material";
import React, {useState} from "react";
import {replaceCharacter} from "../../../../../../utilities/client";
import EditButtonRow from "../../../../../buttons/EditButtonRow/EditButtonRow";
import AlcheimTextField from "../../../../../input/AlcheimTextField";
import {Row} from "../../../../../Row/Row";

import {CharacterAttribute} from "../../AttributesPanel/CharacterAttribute/CharacterAttribute";
import "./SkillsSection.css";

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

const copyCharacterValue = (characterValue: CharacterValue) => {
  return {...characterValue}
}

const copySkills = (skills: CharacterSkills = {}): CharacterSkills => {
  const skillsCopy: CharacterSkills = {};
  Object.entries(skills).forEach(([key, value]) => {
    skillsCopy[key] = copyCharacterValue(value);
  })
  return skillsCopy;
}

const SkillsSection = (props: SkillsSectionProps) => {

  const {character, setCharacter} = props;

  const [isEditingSkills, setEditingSkills] = useState(false);

  const [skills, setSkills] = useState(copySkills(character.skills));

  const setSkillValue = (skillName: string) => {
    return (value: number) => {
      const updatedSkills = {...skills}
      updatedSkills[skillName].value = value;
      setSkills(updatedSkills);
    }
  }

  const onCancelEdit = () => {
    setSkills(copySkills(character.skills))
    setEditingSkills(false);
  };

  const onEdit = () => setEditingSkills(true);

  const onSave = () => {
    const newCharacter = {...character, skills};
    setCharacter(newCharacter)
    replaceCharacter(newCharacter)
      .then(response => response.json())
      .then(setCharacter);
    setEditingSkills(false);
  };

  return (
    <Box p={1}>
      <Row>
        <Typography variant="h5">Skills</Typography>

        <EditButtonRow
          onEdit={onEdit}
          onCancelEdit={onCancelEdit}
          onSave={onSave}
        />
      </Row>

      <Box display="flex" flexWrap="wrap" flexDirection={"column"}>
        <ul className={"character-skills-list"}>

          {Object.values(skills || {})
            .filter((skill: CharacterValue) => isEditingSkills || skill.value > 0)
            .sort(isEditingSkills ? byName : byRankThenName)
            .map((skill) =>
              <li>
                <CharacterAttribute
                  isEditing={isEditingSkills}
                  valueName={skill.name}
                  characterValue={skill}
                  setValue={setSkillValue(skill.name)}
                />
              </li>
            )}

          {isEditingSkills && <li>
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
