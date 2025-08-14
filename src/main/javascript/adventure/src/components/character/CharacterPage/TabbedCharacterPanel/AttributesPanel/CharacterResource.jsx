import {replaceCharacter} from "../../../../../utilities/client";
import {Box, IconButton, LinearProgress} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import React from "react";
import {Row} from "../../../../Row/Row";
import {IncreaseMaximumButton} from "./IncreaseMaximumButton";
import {DecreaseMaximumButton} from "./DecreaseMaximumButton";
import {isNamed, updateValue} from "../../../../../property";
import {arrayRemove} from "../../../../../utilities/arrays";

export const CharacterResource = (props) => {
  const {
    resource,
    character,
    setCharacter,
    isEditing,
    properties,
    setProperties
  } = props;

  if (resource === undefined) {
    return undefined;
  }

  const setCharacterResource = (number) => {
    const newValue = resource.value + (number < resource.value ? -1 : 1);

    const oldProperty = properties.find(isNamed(resource.name));
    arrayRemove(properties, oldProperty).push(updateValue(resource, newValue));
    const newProperties = [...properties];
    setProperties(newProperties);

    character.properties = newProperties;

    replaceCharacter(character)
      .then(response => response.json())
      .then(character => {
        setCharacter(character);
      });
  };

  const max = properties.find(isNamed(resource.name)).properties.find(isNamed("maximum")).value;
  const value = properties.find(isNamed(resource.name)).value;

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
          >
            {int < value ? <CheckBoxIcon/> : <CheckBoxOutlineBlankIcon/>}
          </IconButton>
      )}

      {
        isEditing && max > 0 &&
        <DecreaseMaximumButton {...{
          character,
          setCharacter,
          resource,
          properties,
          setProperties,
        }}
        />
      }
      {
        isEditing &&
        <IncreaseMaximumButton {...{
          character,
          setCharacter,
          resource,
          properties,
          setProperties,
        }}
        />
      }
    </Box>
  );
};
