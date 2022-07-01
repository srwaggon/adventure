import useProficiencies from "../../../proficiency/UseProficiencies";
import {Box, Typography} from "@mui/material";
import ProficiencyChip from "../../ProficiencyChip";
import React from "react";

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
