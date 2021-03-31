import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import useCards from './useCards';
import CenteredGridWithAppBar from '../character/CharacterPage/CenteredGridWithAppBar';
import AddButton from '../buttons/AddButton';
import CardFilter from './CardFilter';
import VisualCard from './VisualCard/VisualCard';

const CardsPage = () => {

  const history = useHistory();

  const cards = useCards();

  const [filterFunc, setFilterFunc] = useState(() => x => x);

  const items = filterFunc(cards).map((card) =>
    <Link to={`/cards/${card.id}`} style={{textDecoration: 'none'}}>
      <VisualCard {...card}/>
    </Link>);

  return <CenteredGridWithAppBar title={'Cards'} items={items}>
    <CardFilter {...{setFilterFunc}} />
    <AddButton onClick={() => history.push('/cards/new')}/>
  </CenteredGridWithAppBar>;
};

export default CardsPage;