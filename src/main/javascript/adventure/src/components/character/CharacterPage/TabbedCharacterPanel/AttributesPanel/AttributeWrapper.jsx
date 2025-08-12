import {isNamed, updateValue} from "../../../../../property";
import {arrayRemove} from "../../../../../utilities/arrays";
import {Attribute} from "./Attribute";
import React from "react";

export const AttributeWrapper = (props) => {
  const {
    attribute, isEditing, properties, setProperties
  } = props;

  if (attribute === undefined) {
    return undefined;
  }

  const setAttributeValue = (attribute) => {
    return (value) => {
      const oldAttributeProperty = properties.find(isNamed(attribute.name));
      const newProperties = arrayRemove(properties, oldAttributeProperty);
      newProperties.push(updateValue(attribute, value));
      setProperties([...newProperties]);
    };
  };

  return <Attribute
    attribute={attribute}
    isEditing={isEditing}
    name={attribute.name}
    value={properties.find(isNamed(attribute.name)).value}
    setValue={setAttributeValue(attribute)}
  />;
};
