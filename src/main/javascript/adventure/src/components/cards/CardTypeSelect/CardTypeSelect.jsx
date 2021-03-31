import React from 'react';
import {getCardTypes} from '../../../utilities/client';
import CardSelect from './../CardSelect';

const CardTypeSelect = ({children, defaultValue, onSelect}) => {
  const populator = (setValues) =>
    getCardTypes()
      .then(response => response.json())
      .then(json => setValues(json));

  return <CardSelect {...{populator, label: 'Type', defaultValue, onSelect, children}}/>;
};

export default CardTypeSelect;