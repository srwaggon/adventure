import useEditions from "../edition/useEditions";
import React from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {prettify} from "../../utilities/kitchen_sink";

const asMenuItem = edition => {
  return <MenuItem key={edition} value={edition.id}>{prettify(edition.name)}</MenuItem>;
};

export const CardEditionSelect = (props) => {
  const {children, value, isEditing = true, onSelect} = props;
  const editions = useEditions();

  const editionsById = editions.reduce((acc, edition) => {
    acc[edition.id] = edition;
    return acc;
  }, {});

  const label = "Edition";

  return <FormControl fullWidth variant={"outlined"} margin={"dense"}>
    <InputLabel>{label}</InputLabel>
    <Select {...{
      label,
      value,
      onChange: (event) => {
        const value = event.target.value;
        onSelect(editionsById[value] || value);
      },
      inputProps: {readOnly: !isEditing}
    }}>
      {children}
      {editions.map(asMenuItem)}
    </Select>
  </FormControl>;
};

export default CardEditionSelect;
