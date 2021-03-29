import {Card, CardContent} from '@material-ui/core';
import TitledAppBar from '../../shared/TitledAppBar';
import CardsGrid from '../../cards/CardsGrid';
import React from 'react';

const CardGridWithAppBar = ({cards, cardDecorator, children, title}) =>
  <Card>
    <TitledAppBar title={title}>
      {children}
    </TitledAppBar>
    <CardContent>
      <CardsGrid
        cards={cards}
        CardDecorator={cardDecorator}/>
    </CardContent>
  </Card>;

export default CardGridWithAppBar;