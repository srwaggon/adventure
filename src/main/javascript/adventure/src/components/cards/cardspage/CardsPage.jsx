import './CardsPage.css';

import React, {useEffect, useState} from 'react';
import {getAllCards} from '../../../utilities/client';
import {AppBar, Box, Toolbar, Typography} from '@material-ui/core';
import EditButton from '../../buttons/EditButton';
import AddButton from '../../buttons/AddButton';
import CardsGrid from '../CardsGrid';

const CardsPage = () => {
  const [cards, setCards] = useState(null);

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
        <EditButton/>
        <AddButton/>
      </Toolbar>
    </AppBar>
    <Box p={4}>
      <CardsGrid cards={cards || []}/>
    </Box>
  </div>;
};

export default CardsPage;