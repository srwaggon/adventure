import './CharacterAttribute.css'

import {IconButton} from '@material-ui/core';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import {AddBox, Backspace} from '@material-ui/icons';
import React from 'react';

const CharacterAttribute = ({character, setCharacter, attribute, isEditing}) => {
  const value = character[attribute].value;

  const increaseValue = () => {
    character[attribute].value += 1;
    setCharacter({...character});
  };

  const reduceValue = () => {
    character[attribute].value -= 1;
    setCharacter({...character});
  };

  return (
    <div className="character-attribute">
      <div className="character-attribute-name">{attribute}</div>
      <div className="character-attribute-value">
        {[...Array(value).keys()].map((int) =>
          <IconButton
            key={attribute}
            color={'default'}
            size={'small'}
            style={{margin: '-4px'}}
            checked={int < value}
          ><CheckBoxIcon/></IconButton>,
        )}
        {isEditing && value > 1 && <IconButton
          checked={false}
          color={'primary'}
          size={'small'}
          style={{margin: '-4px'}}
          onClick={reduceValue}
        ><Backspace/></IconButton>}
        {isEditing && value < 5 && <IconButton
          checked={false}
          color={'primary'}
          size={'small'}
          style={{margin: '-4px'}}
          fullWidth={true}
          onClick={increaseValue}
        ><AddBox/></IconButton>}
      </div>
    </div>
  );
};

export default CharacterAttribute;