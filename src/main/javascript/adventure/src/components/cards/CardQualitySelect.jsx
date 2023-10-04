import React from "react";
import useQualities from "../quality/UseQualities";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {prettify} from "../../utilities/kitchen_sink";

const CardQualitySelect = ({value, onSelect, children}) => {

  const qualities = useQualities();

  const label = "Quality";

  return <FormControl fullWidth variant={"outlined"} margin={"dense"}>
    <InputLabel>{label}</InputLabel>
    <Select {...{
      label,
      value: qualities.length ? value : "",
      onChange: (event) => onSelect(event.target.value)
    }}>
      {children}
      {qualities.map(quality => <MenuItem key={quality} value={quality}>{prettify(quality)}</MenuItem>)}
    </Select>
  </FormControl>;
};

export default CardQualitySelect;
