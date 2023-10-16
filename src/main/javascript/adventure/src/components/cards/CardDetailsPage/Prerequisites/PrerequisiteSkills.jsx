import React, {useState} from "react";
import {List, Typography} from "@mui/material";
import AlcheimTextField from "../../../input/AlcheimTextField";

export const PrerequisiteSkills = () => {
  const [prerequisites, setPrerequisites] = useState([]);

  const addPrerequisite = (str) => setPrerequisites([...prerequisites, str]);

  return <>
    <Typography variant={"h5"}>Skills</Typography>
    <List>
      {prerequisites.map((e, index) => {
        return <li key={`li-${e}-${index}`}>
          {e}
        </li>;
      })}
    </List>
    <AlcheimTextField
      label={"Skill prerequisite"}
      defaultValue={""}
      onKeyDown={event => {
        if (event.key === "Enter") {
          event.preventDefault();
          addPrerequisite(event.target.value);
        }
      }}
    />
  </>;
};
