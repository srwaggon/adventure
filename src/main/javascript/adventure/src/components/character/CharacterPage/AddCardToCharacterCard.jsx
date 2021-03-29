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

  const [filterFunc, setFilterFunc] = useState(() => x => x);

  const addCardToCharacter = (card) => {
    setCharacter({...character, cards: [...character.cards, card.id]});
    setCharacterCards([...characterCards, card]);
  };

  return <Box minWidth={'100%'}>
    <Card>
      <AppBarFilter title={'Add to Character'} setFilterFunc={setFilterFunc}/>
      <CardContent>
        <CardsGrid
          cards={filterFunc(cards)}
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

const filterName = (name) => (card) => card.name.toLowerCase().includes(name);
const filterType = (type) => (card) => 'any' === type || type === card.type;

const AppBarFilter = ({title, setFilterFunc}) => {
  const [filter, setFilter] = useState({
    name: '',
    type: 'any',
  });

  useEffect(() => {
    const wholeFilter = (cards) =>
      cards
        .filter(filterName(filter.name))
        .filter(filterType(filter.type));
    setFilterFunc(() => wholeFilter);
  }, [filter.name, filter.type, setFilterFunc]);

  return <AppBar color='default' position='static'>
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
  </AppBar>;
};

export default AddCardToCharacterCard;