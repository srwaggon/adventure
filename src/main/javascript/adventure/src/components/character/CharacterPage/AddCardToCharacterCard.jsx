import React, {useState} from 'react';
import {Box, Card, CardContent} from '@material-ui/core';
import CardsGrid from '../../cards/CardsGrid';
import AddButton from '../../buttons/AddButton';
import CardFilterAppBar from '../../cards/CardFilterAppBar';
import useCards from '../../cards/useCards';

const AddCardToCharacterCard = ({character, setCharacter, cards: characterCards, setCards: setCharacterCards}) => {

  const cards = useCards();

  const [filterFunc, setFilterFunc] = useState(() => x => x);

  const addCardToCharacter = (card) => {
    setCharacter({...character, cards: [...character.cards, card.id]});
    setCharacterCards([...characterCards, card]);
  };

  const cardDecorator = ({children, card}) =>
    <Box>
      <Card>
        {children}
        <AddButton onClick={() => addCardToCharacter(card)}/>
      </Card>
    </Box>;
  return <Card>
    <CardFilterAppBar title={'Add to Character'} setFilterFunc={setFilterFunc}/>
    <CardContent>
      <CardsGrid
        cards={filterFunc(cards)}
        CardDecorator={cardDecorator}/>
    </CardContent>
  </Card>;
};

export default AddCardToCharacterCard;