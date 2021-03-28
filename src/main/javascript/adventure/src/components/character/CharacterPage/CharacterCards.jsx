import {AppBar, Box, Card, CardContent, MenuItem, TextField, Toolbar, Typography} from '@material-ui/core';
import CardsGrid from '../../cards/CardsGrid';
import DeleteButton from '../../buttons/DeleteButton';
import {arrayRemoveAt} from '../../../utilities/kitchen_sink';
import {replaceCharacter} from '../../../utilities/client';
import React, {useState} from 'react';
import CardTypeSelect from '../../cards/CardTypeSelect/CardTypeSelect';

const CharacterCards = ({
  isEditing,
  cards,
  character,
  setCharacter,
  fetchCharactersCards,
}) => {

  const [filter, setFilter] = useState({
    name: '',
    type: 'any',
  });

  const filterCard = ({name, type}) => filterName(name) && filterType(type);
  const filterName = (name) => name.toLowerCase().includes(filter.name);
  const filterType = (type) => type === filter.type || filter.type === 'any';

  const filteredCards = filter.name.length > 0 || filter.type !== 'any'
    ? cards.filter(filterCard)
    : cards.slice(0, 8);

  return <Card>
    <AppBarFilter title={'Cards'} filter={filter} setFilter={setFilter}/>
    <CardContent>
      <CardsGrid
        cards={filteredCards}
        CardDecorator={({children, index}) =>
          <Card>
            {children}
            <DeleteButton
              disabled={!isEditing}
              onClick={() => {
                const newCards = arrayRemoveAt([...cards], index).map(x => x.id);
                const newCharacter = {...character, cards: newCards};
                replaceCharacter(newCharacter)
                  .then(response => response.json())
                  .then(json => {
                    setCharacter(json);
                    fetchCharactersCards(character);
                  });
              }}/>
          </Card>
        }
      />
    </CardContent>
  </Card>;
};

const AppBarFilter = ({title, filter, setFilter}) =>
  <AppBar color='default' position='static'>
    <Toolbar>
      <Box display={'flex'} flexDirection={'row'} width={'100%'} alignItems={'center'} flexWrap={'wrap'}>
        <Box flexGrow={1} flexShrink={0}>
          <Typography variant='h6'>{title}</Typography>
        </Box>
        <Box display={'flex'} flexGrow={2} flexShrink={0} justifyContent={'flex-end'} flexWrap={'wrap'}>
          <Box flexGrow={1} flexShrink={0}>
            <CardTypeSelect
              defaultValue={'any'}
              onSelectType={(type) => setFilter({...filter, type})}>
              <MenuItem value={'any'}>Any</MenuItem>
            </CardTypeSelect>
          </Box>
          <Box flexGrow={1} flexShrink={0} pl={1}>
            <TextField
              label='Filter by name'
              variant='outlined'
              margin='dense'
              fullWidth
              defaultValue={filter.term}
              onChange={event => setFilter({...filter, name: event.target.value.toLowerCase()})}
            />
          </Box>
        </Box>
      </Box>
    </Toolbar>
  </AppBar>
;

export default CharacterCards;