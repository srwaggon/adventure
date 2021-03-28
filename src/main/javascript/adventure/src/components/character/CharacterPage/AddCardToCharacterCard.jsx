import React, {useEffect, useState} from 'react';
import {getAllCards} from '../../../utilities/client';
import {AppBar, Box, Card, CardContent, MenuItem, TextField, Toolbar, Typography} from '@material-ui/core';
import CardTypeSelect from '../../cards/CardTypeSelect/CardTypeSelect';
import CardsGrid from '../../cards/CardsGrid';
import AddButton from '../../buttons/AddButton';

const AddCardToCharacterCard = ({character, setCharacter, cards: characterCards, setCards: setCharacterCards}) => {

  const [cards, setCards] = useState([]);

  useEffect(() => {
    getAllCards()
      .then(response => response.json())
      .then(setCards);
  }, []);

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

  const addCardToCharacter = (card) => {
    setCharacter({...character, cards: [...character.cards, card.id]});
    setCharacterCards([...characterCards, card]);
  };

  return <Box minWidth={'100%'}>
    <Card>
      <AppBarFilter filter={filter} setFilter={setFilter}/>
      <CardContent>
        <CardsGrid
          cards={filteredCards}
          CardDecorator={({children, card}) =>
            <Box>
              <Card>
                {children}
                <AddButton onClick={() => addCardToCharacter(card)}/>
              </Card>
            </Box>
          }/>
      </CardContent>
    </Card>
  </Box>;
};

const AppBarFilter = ({setFilter, filter}) =>
  <AppBar color='default' position='static'>
    <Toolbar>
      <Box display={'flex'} flexDirection={'row'} width={'100%'} alignItems={'center'} flexWrap={'wrap'}>
        <Box flexGrow={1} flexShrink={0}>
          <Typography variant='h6'>Add to Character</Typography>
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
  </AppBar>;

export default AddCardToCharacterCard;