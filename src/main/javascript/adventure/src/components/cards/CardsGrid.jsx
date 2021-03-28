import {Grid} from '@material-ui/core';
import {Link} from 'react-router-dom';
import SpecialCard from './specialcard/SpecialCard';
import React from 'react';

const CardsGrid = ({cards = [], CardDecorator = ({children}) => children}) =>
  <Grid container justify={'center'} spacing={1}>
    {cards.map(card =>
      <Grid item>
        <CardDecorator card={card}>
          <Link to={`/cards/${card.id}`} style={{textDecoration: 'none'}}>
            <SpecialCard {...card} key={card.id}/>
          </Link>
        </CardDecorator>
      </Grid>)}
  </Grid>;

export default CardsGrid;