import {TextField} from "@mui/material";
import React from "react";

const EditCharacterNameTextField = ({character, setCharacter}) =>
  <TextField
    label={"Name"}
    defaultValue={character.name}
    variant={"outlined"}
    fullWidth
    onChange={event => {
      character.name = event.target.value;
      setCharacter(character);
    }}
  />;

export default EditCharacterNameTextField;
