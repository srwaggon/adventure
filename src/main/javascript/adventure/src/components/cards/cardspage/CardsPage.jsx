import './CardsPage.css';

import React, {useEffect, useState} from 'react';
import {getAllCards} from '../../../utilities/client';
import {AppBar, Box, Toolbar, Typography} from '@material-ui/core';
import AddButton from '../../buttons/AddButton';
import CardsGrid from '../CardsGrid';
import {useHistory} from 'react-router-dom';

const CardsPage = () => {

  const history = useHistory();

  const [cards, setCards] = useState(undefined);

  useEffect(() => {
    if (!cards) {
      getAllCards()
        .then(response => response.json())
        .then(allCards => setCards(allCards));
    }
  });

  return <div className={'cards-page'}>
    <AppBar color="default" position={'static'}>
      <Toolbar>
        <Typography variant={'h6'} style={{flexGrow: 1}}>Cards</Typography>
        <AddButton onClick={() => history.push('/cards/new')}/>
      </Toolbar>
    </AppBar>
    <Box p={4}>
      <CardsGrid cards={cards || []}/>
    </Box>
  </div>;
};

export default CardsPage;