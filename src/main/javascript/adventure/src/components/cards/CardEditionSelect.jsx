import useEditions from '../edition/useEditions';
import {FormControl, InputLabel, MenuItem, Select} from '@material-ui/core';
import React from 'react';

export const CardEditionSelect = ({children, defaultValue, onSelect}) => {
  const editions = useEditions();

  if (!editions) {
    return;
  }

  const label = 'Edition';

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
