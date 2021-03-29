import {Card, CardContent} from '@material-ui/core';
import CardFilterAppBar from '../../cards/CardFilterAppBar';
import CardsGrid from '../../cards/CardsGrid';
import React from 'react';

const CardGridWithAppBar = ({cards, cardDecorator, children, title}) =>
  <Card>
    <CardFilterAppBar title={title}>
      {children}
    </CardFilterAppBar>
    <CardContent>
      <CardsGrid
        cards={cards}
        CardDecorator={cardDecorator}/>
    </CardContent>
  </Card>;

export default CardGridWithAppBar;