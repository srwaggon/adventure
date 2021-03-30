import React from 'react';
import {getCardTypes} from '../../utilities/client';
import CardSelect from './../shared/CardSelect';

const CardQualitySelect = ({children, defaultValue, onSelect}) => {
  const populator = (setValues) =>
    getCardTypes()
      .then(response => response.json())
      .then(json => setValues(json));

  return <CardSelect {...{populator, label: 'Type', defaultValue, onSelect, children}}/>;
};

export default CardQualitySelect;