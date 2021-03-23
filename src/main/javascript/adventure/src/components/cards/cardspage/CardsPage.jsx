import './CardsPage.css';

import React, {useEffect, useState} from 'react';
import SpecialCard from '../specialcard/SpecialCard';
import {getAllCards} from '../../../utilities/client';

const CardsPage = () => {
  const [cards, setCards] = useState(null);

  useEffect(() => {
    if (!cards) {
      getAllCards()
        .then(response => response.json())
        .then(allCards => setCards(allCards));
    }
  });

  const cardsWithMargin = (cards || []).map((card) => <div style={{margin: '.5em'}}>
    <SpecialCard {...card} key={card.id}/>
  </div>);

  return <div className={'cards-page'}>
    {cardsWithMargin}
  </div>;
};

export default CardsPage;