import {AppBar, Box, Toolbar, Typography} from '@material-ui/core';
import SpecialCard from '../specialcard/SpecialCard';
import EditButton from '../../buttons/EditButton';
import AddButton from '../../buttons/AddButton';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getCardById} from '../../../utilities/client';

export function newCard() {
  return {
    name: 'New Card',
    image: '',
    imageSize: '100%',
    type: 'ABILITY',
    body: '',
    flavor: '',
  };
}

const CardPage = () => {

  const {cardId} = useParams();

  const [card, setCard] = useState(null);

  useEffect(() => {
    if (card === null) {
      getCardById(cardId)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(`${response.status}: ${response.statusText}`);
        })
        .then(json => setCard(json))
        .catch((error) => {
          console.log(error);
          setCard(newCard());
        });
    }
  });

  return card === null
    ? <span>Loading...</span>
    : <div>
      <AppBar color="default" position={'static'}>
        <Toolbar>
          <Typography variant={'h6'} style={{flexGrow: 1}}>Cards</Typography>
          <EditButton/>
          <AddButton/>
        </Toolbar>
      </AppBar>
      <Box p={4}>
        <SpecialCard {...card} />
      </Box>
    </div>;
};

export default CardPage;