import React from "react";
import CardSelect from "./CardSelect";
import useCardTypes from "./cardtype/UseCardTypes";

const CardTypeSelect = ({children, defaultValue, onSelect}) => {
  const cardTypes = useCardTypes();

  const populator = (setValues) => setValues(cardTypes);

  return <CardSelect {...{populator, label: "Type", defaultValue, onSelect, children}}/>;
};

export default CardTypeSelect;
