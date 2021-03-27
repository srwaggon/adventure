import React, {useEffect, useState} from 'react';
import {getCardTypes} from '../../../utilities/client';
import {FormControl, InputLabel, MenuItem, Select} from '@material-ui/core';
import {prettifyCardType} from '../../../utilities/kitchen_sink';

const CardTypeSelect = ({card, setCard}) => {
  const [cardTypes, setCardTypes] = useState([]);
  useEffect(() => {
    getCardTypes()
      .then(response => response.json())
      .then(json => setCardTypes(json));
  }, []);

  return <FormControl fullWidth variant={'outlined'} margin={'dense'}>
    <InputLabel>Type</InputLabel>
    <Select label={'Type'} defaultValue={card.type} onChange={event => setCard({...card, type: event.target.value})}>
      {cardTypes.map(cardType => <MenuItem value={cardType}>{prettifyCardType(cardType)}</MenuItem>)}
    </Select>
  </FormControl>;
};

export default CardTypeSelect;