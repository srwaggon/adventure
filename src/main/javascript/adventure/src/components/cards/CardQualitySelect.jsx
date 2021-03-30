import React from 'react';
import {getCardQualities} from '../../utilities/client';
import CardSelect from './../shared/CardSelect';

const CardQualitySelect = ({children, defaultValue, onSelect}) => {
  const populator = (setValues) =>
    getCardQualities()
      .then(response => response.json())
      .then(json => setValues(json));

  return <CardSelect {...{populator, label: 'Quality', defaultValue, onSelect, children}}/>;
};

export default CardQualitySelect;