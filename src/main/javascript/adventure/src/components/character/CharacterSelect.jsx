import React from 'react';
import useCurrentPlayersCharacters from './CharactersPage/UseCurrentPlayersCharacters';
import {FormControl, InputLabel, MenuItem, Select} from '@material-ui/core';
import {noop} from '../../utilities/kitchen_sink';

export const CurrentPlayersCharactersSelect = ({defaultValue, onSelect}) => {
  const characters = useCurrentPlayersCharacters();

  return <CharacterSelect
    characters={characters}
    defaultValue={defaultValue}
    onSelect={onSelect}
  />;
};

const newMenuItem = (character) =>
  <MenuItem key={character.id} value={character}>
    {character.name}
  </MenuItem>;

export const CharacterSelect = ({
  characters = [],
  label = 'Character',
  defaultValue,
  onSelect = noop,
}) => {

  return <FormControl fullWidth variant='outlined' margin='dense'>
    <InputLabel>{label}</InputLabel>
    <Select label={label} defaultValue={defaultValue} onChange={event => onSelect(event.target.value)}>
      {characters.map(newMenuItem)}
    </Select>
  </FormControl>;
};

export default CharacterSelect;
