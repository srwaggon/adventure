import './CardsPage.css';

import React, {useEffect, useState} from 'react';
import SpecialCard from '../specialcard/SpecialCard';
import {getAllCards} from '../../../utilities/client';
import {AppBar, Box, Grid, Toolbar, Typography} from '@material-ui/core';
import EditButton from '../../buttons/EditButton';
import {Link} from 'react-router-dom';
import AddButton from '../../buttons/AddButton';

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
      <Grid container justify={'center'} spacing={4}>
        {(cards || []).map((card) =>
          <Grid item>
            <Link to={`/cards/${card.id}`} style={{textDecoration: 'none'}}>
              <SpecialCard {...card} key={card.id}/>
            </Link>
          </Grid>)}
      </Grid>
    </Box>
  </div>;
};

export default CardsPage;