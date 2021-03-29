import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import useCards from './useCards';
import CardGridWithAppBar from '../character/CharacterPage/CardGridWithAppBar';
import AddButton from '../buttons/AddButton';
import CardFilter from './CardFilter';

const CardsPage = () => {

  const history = useHistory();

  const cards = useCards();

  const [filterFunc, setFilterFunc] = useState(() => x => x);

  return <CardGridWithAppBar
    title={'Cards'}
    cards={filterFunc(cards)}
    setFilterFunc={setFilterFunc}
  >
    <CardFilter {...{setFilterFunc}} />
    <AddButton onClick={() => history.push('/cards/new')}/>
  </CardGridWithAppBar>;
};

export default CardsPage;