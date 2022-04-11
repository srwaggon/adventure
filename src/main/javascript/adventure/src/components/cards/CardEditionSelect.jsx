import useEditions from "../edition/useEditions";
import React from "react";
import CardSelect from "./CardSelect";

export const CardEditionSelect = ({children, defaultValue, onSelect}) => {
  const editions = useEditions();

  const editionsByName = editions.reduce((acc, edition) => {
    acc[edition.name] = edition;
    return acc;
  }, {});

  return <CardSelect {...{
    populator: (setValues) => setValues(editions.map(edition => edition.name)),
    label: "Edition",
    defaultValue,
    onSelect: (value) => onSelect(editionsByName[value] || value),
    children
  }} />
};

export default CardEditionSelect;
