import './App.css';

import React from 'react';
import {BrowserRouter as Router, Route, Switch, useHistory} from 'react-router-dom';
import CharacterPage from '../character/CharacterPage/CharacterPage';
import CharactersPage from '../character/CharactersPage/CharactersPage';
import CardsPage from '../cards/CardsPage';
import {AppBar, Box, Button, Toolbar, Typography} from '@material-ui/core';
import CardPage from '../cards/CardDetailsPage/CardDetailsPage';
import GamesPage from '../game/GamesPage';
import GameDetailsPage from '../game/GameDetailsPage';
import {useStyles} from '../Styles';

const Navigation = () => {
  const history = useHistory();
  return <Toolbar>
    <Box display='flex' justifyContent={'space-between'} width={1} alignItems={'center'} flexWrap={'wrap'} ml={-1}>
      <Button color={'inherit'} onClick={() => history.push('/')}>
        <Typography variant="h4" style={{textTransform: 'capitalize'}}>Alcheim Online</Typography>
      </Button>
      <Box>
        <Button color="inherit" onClick={() => history.push('/cards')}>Cards</Button>
        <Button color="inherit" onClick={() => history.push('/characters')}>Characters</Button>
        <Button color="inherit" onClick={() => history.push('/games')}>Games</Button>
        <Button color="inherit" href={'/logout'}>Logout</Button>
      </Box>
    </Box>
  </Toolbar>;
};

const App = () => {
  const classes = useStyles();
  return (<Box className="App">
    <Router>
      <AppBar position={'relative'} className={classes.headerBar}>
        <Navigation/>
      </AppBar>
      <Switch>
        <Route path="/cards/:cardId"><CardPage/></Route>
        <Route path="/cards"><CardsPage/></Route>
        <Route path="/characters/:characterId"><CharacterPage/></Route>
        <Route path="/characters"><CharactersPage/></Route>
        <Route path="/games/:gameId"><GameDetailsPage/></Route>
        <Route path="/games"><GamesPage/></Route>
        <Route path="/"><CharactersPage/></Route>
      </Switch>
    </Router>
  </Box>)
    ;
};

export default App;
