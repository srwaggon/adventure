import React, {useState} from 'react';

import {Card} from '@material-ui/core';
import AddButton from '../../buttons/AddButton';
import useCards from '../../cards/useCards';
import CenteredGridWithAppBar from './CenteredGridWithAppBar';
import CardFilter from '../../cards/CardFilter';
import {Link} from 'react-router-dom';
import SpecialCard from '../../cards/specialcard/SpecialCard';

const AddCardToCharacterCard = ({character, setCharacter, cards: characterCards, setCards: setCharacterCards}) => {
  const cards = useCards();

  const [filterFunc, setFilterFunc] = useState(() => x => x);

  const addCardToCharacter = card => {
    setCharacter({...character, cards: [...character.cards, card.id]});
    setCharacterCards([...characterCards, card]);
  };

  const items = filterFunc(cards).map((card) =>
    <Card>
      <Link to={`/cards/${card.id}`} style={{textDecoration: 'none'}}>
        <SpecialCard {...card}/>
      </Link>
      <AddButton onClick={() => addCardToCharacter(card)}/>
    </Card>);

  return <CenteredGridWithAppBar title={'Add to Character'} items={items}>
    <CardFilter {...{setFilterFunc}} />
  </CenteredGridWithAppBar>;
};

export default AddCardToCharacterCard;