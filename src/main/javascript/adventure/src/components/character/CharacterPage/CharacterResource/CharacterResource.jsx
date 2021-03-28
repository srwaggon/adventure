import './CharacterResource.css'

import {replaceCharacter} from '../../../../utilities/client';
import {Box, IconButton} from '@material-ui/core';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import {AddBox, Backspace} from '@material-ui/icons';
import React from 'react';

const CharacterResource = ({character, setCharacter, isEditing, resource}) => {
  const max = character[resource].maximum;
  const value = character[resource].value;

  const setCharacterResource = number => {
    character[resource].value += number < character[resource].value ? -1 : 1;
    replaceCharacter(character)
      .then(response => response.json())
      .then(character => {
        setCharacter(character);
      });
  };

  const increaseMaximum = () => {
    character[resource].maximum += 1;
    setCharacter({...character});
  };

  const reduceMaximum = () => {
    character[resource].maximum -= 1;
    setCharacter({...character});
  };

  return (
    <Box className="character-resource" p={1}>
      <div className={'character-resource-name'}>{resource}</div>
      <div className="character-resource-value">
        {[...Array(max).keys()].map(
          (int) =>
            <IconButton
              key={resource}
              checked={int < value}
              disabled={int >= max}
              color={'default'}
              size={'small'}
              style={{margin: '-4px'}}
              onClick={(ignored) => setCharacterResource(int)}
            >
              {int < value ? <CheckBoxIcon/> : <CheckBoxOutlineBlankIcon/>}
            </IconButton>)}

        {isEditing && <IconButton
          checked={false}
          color={'primary'}
          size={'small'}
          style={{margin: '-4px'}}
          onClick={reduceMaximum}
        ><Backspace/></IconButton>}
        {isEditing && <IconButton
          checked={false}
          color={'primary'}
          size={'small'}
          style={{margin: '-4px'}}
          fullWidth={true}
          onClick={increaseMaximum}
        ><AddBox/></IconButton>}
      </div>
    </Box>
  );
};

export default CharacterResource;