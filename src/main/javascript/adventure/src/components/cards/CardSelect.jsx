import React, {useEffect, useState} from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

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
      {values.map(value =>
        <MenuItem value={value}>{value}</MenuItem>,
      )}
    </Select>
  </FormControl>;
};

export default CardSelect;
