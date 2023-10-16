import {Box} from "@mui/material";
import React from "react";
import {PrerequisiteSkills} from "./PrerequisiteSkills";
import {PrerequisiteCards} from "./PrerequisiteCards";
import {PrerequisiteAttributes} from "./PrerequisiteAttributes";

const PrerequisitesForm = () => {
  return (
    <Box display="flex" flexDirection="column">
      <PrerequisiteAttributes/>

    <PrerequisiteSkills/>

      <PrerequisiteCards/>
  </Box>
  );
};

export default PrerequisitesForm;
