import useEditions from "../edition/useEditions";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import React from "react";

export const CardEditionSelect = ({children, defaultValue, onSelect}) => {
  const editions = useEditions();

  const label = "Edition";

  return <FormControl fullWidth variant={'outlined'} margin={'dense'}>
    <InputLabel>{label}</InputLabel>
    <Select
      label={label}
      defaultValue={defaultValue}
      onChange={event => onSelect(event.target.value)}>
      {children}
      {editions.map(edition =>
        <MenuItem key={edition.id} value={edition.id}>{edition.name}</MenuItem>,
      )}
    </Select>
  </FormControl>;
};

export default CardEditionSelect;
