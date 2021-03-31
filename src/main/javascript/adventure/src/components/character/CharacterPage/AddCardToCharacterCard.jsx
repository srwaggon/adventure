import React, {useState} from 'react';

import {Card} from '@material-ui/core';
import AddButton from '../../buttons/AddButton';
import useCards from '../../cards/useCards';
import CenteredGridWithAppBar from './../../shared/CenteredGridWithAppBar';
import CardFilter from '../../cards/CardFilter';
import {Link} from 'react-router-dom';
import VisualCard from '../../cards/VisualCard/VisualCard';

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
        <VisualCard {...card}/>
      </Link>
      <AddButton onClick={() => addCardToCharacter(card)}/>
    </Card>);

  return <CenteredGridWithAppBar
    title={'Add to Character'}
    menuItems={
      <CardFilter {...{setFilterFunc}} />
    }>
    {items}
  </CenteredGridWithAppBar>;
};

export default AddCardToCharacterCard;