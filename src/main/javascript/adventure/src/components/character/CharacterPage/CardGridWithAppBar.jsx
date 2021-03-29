import {Card, CardContent} from '@material-ui/core';
import CardFilterAppBar from '../../cards/CardFilterAppBar';
import CardsGrid from '../../cards/CardsGrid';
import React from 'react';

const CardGridWithAppBar = ({title, setFilterFunc, filterFunc, cards, cardDecorator}) => <Card>
  <CardFilterAppBar title={title} setFilterFunc={setFilterFunc}/>
  <CardContent>
    <CardsGrid
      cards={filterFunc(cards)}
      CardDecorator={cardDecorator}/>
  </CardContent>
</Card>;

export default CardGridWithAppBar;