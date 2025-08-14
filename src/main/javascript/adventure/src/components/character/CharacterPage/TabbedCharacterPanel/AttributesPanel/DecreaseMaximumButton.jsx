import {isNamed, updateValue} from "../../../../../property";
import {IconButton} from "@mui/material";
import {Backspace} from "@mui/icons-material";
import React from "react";
import {arrayRemove} from "../../../../../utilities/arrays";

export const DecreaseMaximumButton = (props) => {
  const {
    resource,
    properties,
    setProperties,
  } = props;

  const decreaseMaximum = () => {
    const currentProperty = properties.find(isNamed(resource.name));
    const currentMaximum = currentProperty.properties.find(isNamed("maximum"));

    const newValue = Math.min(currentProperty.value, currentMaximum.value - 1);
    const newProperty = updateValue(resource, newValue);
    const newPropertyMaximum = newProperty.properties.find(isNamed("maximum"));
    newProperty.properties = arrayRemove(newProperty.properties, newPropertyMaximum);
    newProperty.properties.push(updateValue(currentMaximum, currentMaximum.value - 1));

    const newProperties = arrayRemove(properties, currentProperty);
    newProperties.push(newProperty);

    setProperties([...newProperties]);
  };

  return (
    <IconButton
      checked={false}
      color={"primary"}
      size={"small"}
      style={{
        margin: "-4px"
      }}
      onClick={decreaseMaximum}
    >
      <Backspace/>
    </IconButton>
  );
};
