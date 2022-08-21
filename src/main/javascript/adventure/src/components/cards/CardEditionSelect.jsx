import useEditions from "../edition/useEditions";
import React from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {prettify} from "../../utilities/kitchen_sink";

export const CardEditionSelect = ({children, defaultValue, onSelect}) => {
  const editions = useEditions();

  const editionsByName = editions.reduce((acc, edition) => {
    acc[edition.name] = edition;
    return acc;
  }, {});

  const label = "Edition";

  return <FormControl fullWidth variant={"outlined"} margin={"dense"}>
    <InputLabel>{label}</InputLabel>
    <Select {...{
      label,
      defaultValue,
      onChange: (event) => {
        const value = event.target.value;
        onSelect(editionsByName[value] || value);
      }
    }}>
      {children}
      {editions.map(edition => <MenuItem key={edition} value={edition}>{prettify(edition.name)}</MenuItem>)}
    </Select>
  </FormControl>;
};

export default CardEditionSelect;
