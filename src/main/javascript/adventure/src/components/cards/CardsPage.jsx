import React from 'react';

import {AppBar, Box, Container, Toolbar, Typography} from '@material-ui/core';
import AddButton from '../buttons/AddButton';
import CardsGrid from './CardsGrid';
import {useHistory} from 'react-router-dom';
import useCards from './useCards';

const CardsPage = () => {

  const history = useHistory();

  const cards = useCards();

  return <div>
    <AppBar color="default" position={'static'}>
      <Toolbar>
        <Typography variant={'h6'} style={{flexGrow: 1}}>Cards</Typography>
        <AddButton onClick={() => history.push('/cards/new')}/>
      </Toolbar>
    </AppBar>
    <Container>
      <Box p={4}>
        <CardsGrid cards={cards || []}/>
      </Box>
    </Container>
  </div>;
};

export default CardsPage;