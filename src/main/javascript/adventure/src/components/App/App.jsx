import './App.css';

import React from 'react';
import {BrowserRouter as Router, Route, Switch, useHistory} from 'react-router-dom';
import CharacterPage from '../character/page/CharacterPage.jsx';
import CardsPage from '../cards/cardspage/CardsPage';
import HomePage from '../home/HomePage';
import {AppBar, Button, Container, Paper, Toolbar, Typography} from '@material-ui/core';
import CardPage from '../cards/CardPage/CardPage';

const Navigation = () => {
  const history = useHistory();
  return <Toolbar>
    <Button color={'inherit'} onClick={() => history.push('/')}>
      <Typography variant="h4">Alcheim Online</Typography>
    </Button>
    <div style={{flexGrow: 1}}/>
    <Button color="inherit" onClick={() => history.push('/cards')}>Cards</Button>
    <Button color="inherit" onClick={() => history.push('/characters')}>Characters</Button>
    <Button color="inherit" onClick={() => history.push('/games')}>Games</Button>
    <Button color="inherit" href={'/logout'}>Logout</Button>
  </Toolbar>;
};

const App = () => {
  return (<Paper className="App">
    <Router>
      <Container style={{minHeight: '100vh'}}>
        <Paper>
          <AppBar position={'static'}>
            <Navigation/>
          </AppBar>
          <Switch>
            <Route path="/cards/:cardId"><CardPage/></Route>
            <Route path="/cards"><CardsPage/></Route>
            <Route path="/characters/:characterId"><CharacterPage/></Route>
            <Route path="/"><HomePage/></Route>
          </Switch>
        </Paper>
      </Container>
    </Router>
  </Paper>);
};

export default App;
