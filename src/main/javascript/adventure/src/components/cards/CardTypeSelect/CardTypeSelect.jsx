import React, {useEffect, useState} from 'react';
import {getCardTypes} from '../../../utilities/client';
import {FormControl, InputLabel, MenuItem, Select} from '@material-ui/core';
import {prettify} from '../../../utilities/kitchen_sink';

const CardTypeSelect = ({children, defaultValue, onSelectType}) => {
  const [cardTypes, setCardTypes] = useState([]);
  useEffect(() => {
    getCardTypes()
      .then(response => response.json())
      .then(json => setCardTypes(json));
  }, []);

  return <FormControl fullWidth variant={'outlined'} margin={'dense'}>
    <InputLabel>Type</InputLabel>
    <Select label={'Type'} defaultValue={defaultValue} onChange={event => onSelectType(event.target.value)}>
      {children}
      {cardTypes.map(cardType =>
        <MenuItem value={cardType}>{prettify(cardType)}</MenuItem>,
      )}
    </Select>
  </FormControl>;
};

export default CardTypeSelect;