import {Grid} from '@material-ui/core';
import {Link} from 'react-router-dom';
import SpecialCard from './specialcard/SpecialCard';
import React from 'react';

const CardsGrid = ({cards = []}) =>
  <Grid container justify={'space-evenly'} spacing={4}>
    {cards.map(card =>
      <Grid item>
        <Link to={`/cards/${card.id}`} style={{textDecoration: 'none'}}>
          <SpecialCard {...card} key={card.id}/>
        </Link>
      </Grid>)}
  </Grid>;

export default CardsGrid;