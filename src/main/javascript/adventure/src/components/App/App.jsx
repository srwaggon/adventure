import './App.css';

import React from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import CharacterPage from '../character/page/CharacterPage.jsx';
import Cards from '../cards/Cards';
import HomePage from '../home/HomePage';

const App = () => {
  return (<div className="App">
    <div className="container unauthenticated">
      <div>
        <a href="/logout">Logout</a>
      </div>
    </div>
    <Router>
      <Navigation/>
      <Switch>
        <Route path="/cards"><Cards/></Route>
        <Route path="/character/:characterId"><CharacterPage/></Route>
        <Route path="/"><HomePage/></Route>
      </Switch>
    </Router>
  </div>);
};

const Navigation = () => {
  return (<nav>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/cards">Cards</Link></li>
    <li><Link to="/character">CharacterSheet</Link></li>
  </nav>);
};

export default App;
