import {replaceCharacter} from "../../../../../utilities/client";
import {Box, IconButton, LinearProgress} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import {AddBox, Backspace} from "@mui/icons-material";
import React from "react";
import {Row} from "../../../../Row/Row";

const DecreaseMaximumButton = ({character, setCharacter, resource}) => {
  const decreaseMaximum = () => {
    resource.maximum -= 1;
    resource.value = Math.min(resource.value, resource.maximum);
    setCharacter({...character});
  };

  return <IconButton
    checked={false}
    color={"primary"}
    size={"small"}
    style={{margin: "-4px"}}
    onClick={decreaseMaximum}
  ><Backspace/></IconButton>;
};

const IncreaseMaximumButton = ({character, setCharacter, resource}) => {
  const increaseMaximum = () => {
    const value = resource.value;
    const max = resource.maximum;
    resource.value = value + (value === max ? 1 : 0);
    resource.maximum += 1;
    setCharacter({...character});
  };

  return <IconButton
    checked={false}
    color={"primary"}
    size={"small"}
    style={{margin: "-4px"}}
    fullWidth={true}
    onClick={increaseMaximum}
  ><AddBox/></IconButton>;
};

export const CharacterResource = ({character, setCharacter, isEditing, resource}) => {
  const max = resource.maximum;
  const value = resource.value;

  const setCharacterResource = number => {
    resource.value += number < resource.value ? -1 : 1;
    character[resource.name] = resource;
    replaceCharacter(character)
      .then(response => response.json())
      .then(character => {
        setCharacter(character);
      });
  };

  return (
    <Box>
      <Box p={1}>
        <Row>
          <Box style={{textTransform: "capitalize", textAlign: "left"}}>
            {resource.name}
          </Box>
          {value + "/" + max}
        </Row>
      </Box>
      <LinearProgress styles={{borderRadius: 5}} variant="determinate" value={value / max * 100}/>
      {[...Array(max).keys()].map(
        (int) =>
          <IconButton
            key={`${resource.name}-${int}`}
            checked={int < value}
            disabled={isEditing}
            color={"default"}
            size={"small"}
            style={{margin: "-4px"}}
            onClick={(ignored) => setCharacterResource(int)}
          >{int < value ? <CheckBoxIcon/> : <CheckBoxOutlineBlankIcon/>}
          </IconButton>)}

      {isEditing && max > 0 && <DecreaseMaximumButton {...{character, setCharacter, resource}}/>}
      {isEditing && <IncreaseMaximumButton {...{character, setCharacter, resource}}/>}
    </Box>
  );
};
