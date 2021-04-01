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

export const CharacterSelect = ({
  characters = [],
  label = 'Character',
  defaultValue = undefined,
  onSelect = noop,
}) => {
  const menuItems = characters.map((character) => <MenuItem value={character}>{character.name}</MenuItem>);

  return <FormControl fullWidth variant='outlined' margin='dense'>
    <InputLabel>{label}</InputLabel>
    <Select label={label} defaultValue={defaultValue} onChange={(event) => onSelect(event.target.value)}>
      {menuItems}
    </Select>
  </FormControl>;
};

export default CharacterSelect;