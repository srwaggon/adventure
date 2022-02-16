import {Box, Chip} from "@mui/material";
import {arrayRemoveAll, prettify} from "../../utilities/kitchen_sink";
import React from "react";

const ProficiencyChip = ({proficiency, character, setCharacter, isEditing}) => {
  const proficiencies = character.proficiencies || [];
  const isProficient = proficiencies.indexOf(proficiency) > -1;
  return (isEditing || isProficient) && <Box m={1}>
    <Chip
      label={prettify(proficiency)}
      clickable
      color={isEditing && isProficient ? "primary" : "default"}
      onClick={() => {
        if (isEditing) {
          if (isProficient) {
            arrayRemoveAll(proficiencies, proficiency);
          } else {
            proficiencies.push(proficiency);
          }
          setCharacter({...character, proficiencies});
        }
      }}
    />
  </Box>;
};

export default ProficiencyChip;
