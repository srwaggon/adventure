import {replaceCharacter} from '../../../../utilities/client';
import {Box, Button, IconButton, LinearProgress} from '@material-ui/core';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import {AddBox, Backspace} from '@material-ui/icons';
import React from 'react';
import {D10Icon} from '../../../icons/DiceIcons';

const DecreaseMaximumButton = ({character, setCharacter, resource}) => {
  const decreaseMaximum = () => {
    character[resource].maximum -= 1;
    setCharacter({...character});
  };

  return <IconButton
    checked={false}
    color={'primary'}
    size={'small'}
    style={{margin: '-4px'}}
    onClick={decreaseMaximum}
  ><Backspace/></IconButton>;
};

const IncreaseMaximumButton = ({character, setCharacter, resource}) => {
  const increaseMaximum = () => {
    character[resource].maximum += 1;
    setCharacter({...character});
  };

  return <IconButton
    checked={false}
    color={'primary'}
    size={'small'}
    style={{margin: '-4px'}}
    fullWidth={true}
    onClick={increaseMaximum}
  ><AddBox/></IconButton>;
};

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

  return (
    <Box className="character-resource" width={260} mb={2}>
      <Button startIcon={<D10Icon/>}>
        <Box width={80} style={{textTransform: 'capitalize', textAlign: 'left'}}>{resource}</Box>
      </Button>
      <Box width={220}>
        <LinearProgress styles={{borderRadius: 5}} variant="determinate" value={value / max * 100}/>
        {[...Array(max).keys()].map(
          (int) =>
            <IconButton
              key={resource}
              checked={int < value}
              disabled={isEditing}
              color={'default'}
              size={'small'}
              style={{margin: '-4px'}}
              onClick={(ignored) => setCharacterResource(int)}
            >{int < value ? <CheckBoxIcon/> : <CheckBoxOutlineBlankIcon/>}
            </IconButton>)}

        {isEditing && max > 0 && <DecreaseMaximumButton {...{character, setCharacter, resource}}/>}
        {isEditing && <IncreaseMaximumButton {...{character, setCharacter, resource}}/>}
      </Box>
    </Box>
  );
};

export default CharacterResource;
