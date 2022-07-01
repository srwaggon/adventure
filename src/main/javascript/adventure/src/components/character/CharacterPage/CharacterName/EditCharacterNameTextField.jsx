import {TextField} from "@mui/material";
import React from "react";

export const EditCharacterNameTextField = ({name, setName}) =>
  <TextField
    label={"Name"}
    defaultValue={name}
    variant={"outlined"}
    fullWidth
    onChange={event => {
      setName(event.target.value);
    }}
  />;
