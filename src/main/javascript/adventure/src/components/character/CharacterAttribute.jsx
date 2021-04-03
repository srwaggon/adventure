import {Box, Button, IconButton} from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import {AddBox, Backspace} from '@material-ui/icons';
import React from 'react';
import {D10Icon} from '../icons/DiceIcons';

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
    <Box className="character-attribute" alignItems={'center'} width={260} display='flex'>
      <Button startIcon={<D10Icon/>}>
        <Box width={80}>
          <div style={{textTransform: 'capitalize'}}>{attribute}</div>
        </Box>
      </Button>
      <div className="character-attribute-value">
        {[...Array(value).keys()].map((int) =>
          <IconButton
            key={attribute}
            color={'default'}
            size={'small'}
            style={{margin: '-4px'}}
            checked={int < value}
          ><FiberManualRecordIcon/></IconButton>,
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
    </Box>
  );
};

export default CharacterAttribute;
