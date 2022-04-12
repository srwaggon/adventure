import React from "react";
import useQualities from "../quality/UseQualities";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {prettify} from "../../utilities/kitchen_sink";

const CardQualitySelect = ({defaultValue, onSelect, children}) => {

  const qualities = useQualities();

  const label = "Quality";

  return <FormControl fullWidth variant={"outlined"} margin={"dense"}>
    <InputLabel>{label}</InputLabel>
    <Select {...{
      label,
      defaultValue,
      onChange: (event, value) => {
        console.log(event.target.value, value);
        return onSelect(event.target.value);
      }
    }}>
      {children}
      {qualities.map(value => <MenuItem value={value}>{prettify(value)}</MenuItem>)}
    </Select>
  </FormControl>;
};

export default CardQualitySelect;
