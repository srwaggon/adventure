import './HomePage.css';

import React, {useEffect, useState} from 'react';

import {getCurrentPlayersCharacters, postNewCharacter} from '../../utilities/client';
import {Link} from 'react-router-dom';
import {AppBar, Box, Card, Grid, Toolbar, Typography} from '@material-ui/core';
import EditButton from '../buttons/EditButton';

const HomePage = () => {
  return (<div className={'HomePage'}>
    <CharacterSelectionPage/>
  </div>);
};

const CharacterSelectionPage = () => {

  const [characters, setCharacters] = useState([
    blankCharacter(),
    blankCharacter(),
    blankCharacter(),
    blankCharacter(),
    blankCharacter(),
  ]);

  useEffect(() => {
    if (characters !== null) {
      return;
    }
    getCurrentPlayersCharacters()
      .then(response => response.json())
      .then(json => setCharacters(json));
  });

  const characterPanels = (characters || []).map(
    character => <CharacterPanel character={character}/>);

  return <div className={'character-selection-page'}>
    <AppBar color="default" position={'static'}>
      <Toolbar>
        <Typography variant={'h6'} style={{flexGrow: 1}}>Select a Character</Typography>
        <EditButton/>
      </Toolbar>
    </AppBar>
    <Box p={4}>
      <Grid className={'character-selections-panel'} container justify="center" spacing={4}>
        {characterPanels}
        <Grid item>
          <Card className={'character-new-panel character-panel'} item>
            <div className={'character-new-panel-plus'}
                 onClick={() => postNewCharacter().then(value => setCharacters(null))}>
              +
            </div>
          </Card>
        </Grid>
      </Grid>
    </Box>
  </div>;
};

const CharacterPanel = ({character}) =>
  <Grid item>
    <Link className={'character-selection-panel'} to={`/characters/${character.id}`}>
      <Card className={'character-panel'}>
        <img className={'character-selection-panel-image'}
             alt={'character portrait'}
             src={'https://cdn.discordapp.com/attachments/823412384311279666/823443211988107264/Travin_the_Human.jpeg'}/>
        <Typography className={'character-selection-panel-name'} variant="h4">
          {character.name}
        </Typography>
      </Card>
    </Link>
  </Grid>
;

export default HomePage;

const blankCharacter = () => ({
  'id': 'e24f5654-f4c1-4c71-acbe-1b795626a138',
  'name': 'New Character',
  'strength': {
    'value': 1,
    'minimum': 1,
    'maximum': 5,
  },
  'dexterity': {
    'value': 1,
    'minimum': 1,
    'maximum': 5,
  },
  'constitution': {
    'value': 3,
    'minimum': 1,
    'maximum': 5,
  },
  'presence': {
    'value': 1,
    'minimum': 1,
    'maximum': 5,
  },
  'influence': {
    'value': 1,
    'minimum': 1,
    'maximum': 5,
  },
  'composure': {
    'value': 1,
    'minimum': 1,
    'maximum': 5,
  },
  'intelligence': {
    'value': 1,
    'minimum': 1,
    'maximum': 5,
  },
  'wits': {
    'value': 1,
    'minimum': 1,
    'maximum': 5,
  },
  'resolve': {
    'value': 1,
    'minimum': 1,
    'maximum': 5,
  },
  'stamina': {
    'value': 3,
    'minimum': 1,
    'maximum': 6,
  },
  'confidence': {
    'value': 1,
    'minimum': 1,
    'maximum': 2,
  },
  'focus': {
    'value': 1,
    'minimum': 1,
    'maximum': 2,
  },
  'health': {
    'value': 10,
    'minimum': 1,
    'maximum': 20,
  },
  'willpower': {
    'value': 10,
    'minimum': 1,
    'maximum': 10,
  },
});

