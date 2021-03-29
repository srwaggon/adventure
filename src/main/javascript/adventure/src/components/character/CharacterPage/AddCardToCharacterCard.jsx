import React, {useState} from 'react';

import {Card} from '@material-ui/core';
import AddButton from '../../buttons/AddButton';
import useCards from '../../cards/useCards';
import CardGridWithAppBar from './CardGridWithAppBar';

const AddCardToCharacterCard = ({character, setCharacter, cards: characterCards, setCards: setCharacterCards}) => {
  const cards = useCards();

  const [filterFunc, setFilterFunc] = useState(() => x => x);

  const addCardToCharacter = card => {
    setCharacter({...character, cards: [...character.cards, card.id]});
    setCharacterCards([...characterCards, card]);
  };

  const cardDecorator = ({children, card}) =>
    <Card>
      {children}
      <AddButton onClick={() => addCardToCharacter(card)}/>
    </Card>;

  return <CardGridWithAppBar
    title={'Add to Character'}
    cards={cards}
    filterFunc={filterFunc}
    setFilterFunc={setFilterFunc}
    cardDecorator={cardDecorator}
  />;
};

export default AddCardToCharacterCard;