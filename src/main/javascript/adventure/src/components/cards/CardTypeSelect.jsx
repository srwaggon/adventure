import React from "react";
import useCardTypes from "./cardtype/UseCardTypes";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {prettify} from "../../utilities/kitchen_sink";

const CardTypeSelect = ({children, value, onSelect}) => {
  const cardTypes = useCardTypes();

  const label = "Type";

  return <FormControl fullWidth variant={"outlined"} margin={"dense"}>
    <InputLabel>{label}</InputLabel>
    <Select {...{
      label,
      value: cardTypes.length ? value : "",
      size: "small",
      onChange: (event) => onSelect(event.target.value)
    }}>
      {children}
      {cardTypes.map(cardType => <MenuItem key={cardType} value={cardType}>{prettify(cardType)}</MenuItem>)}
    </Select>
  </FormControl>;
};

export default CardTypeSelect;
