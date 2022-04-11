import React, {useEffect, useState} from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {prettify} from "../../utilities/kitchen_sink";

const CardSelect = ({label, populator, defaultValue, onSelect, children}) => {
  const [values, setValues] = useState([]);

  useEffect(() => {
    populator(setValues);
  }, [populator]);

  return <FormControl fullWidth variant={"outlined"} margin={"dense"}>
    <InputLabel>{label}</InputLabel>
    <Select
      label={label}
      defaultValue={defaultValue}
      onChange={event => onSelect(event.target.value)}>
      {children}
      {values.map(cardType =>
        <MenuItem value={cardType}>{prettify(cardType)}</MenuItem>,
      )}
    </Select>
  </FormControl>;
};

export default CardSelect;
