import React from "react";
import CardSelect from "./CardSelect";
import useQualities from "../quality/UseQualities";

const CardQualitySelect = ({children, defaultValue, onSelect}) => {

  const qualities = useQualities();

  const populator = (setValues) => setValues(qualities);

  return <CardSelect {...{populator, label: "Quality", defaultValue, onSelect, children}}/>;
};

export default CardQualitySelect;
