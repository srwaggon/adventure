import './CharactersPage.css';

import React, {useEffect, useState} from 'react';

import {getCurrentPlayersCharacters, postNewCharacter} from '../../../utilities/client';
import {Link} from 'react-router-dom';
import {AppBar, Box, Card, Grid, Toolbar, Typography} from '@material-ui/core';
import EditButton from '../../buttons/EditButton';
import CharacterPortrait from '../CharacterPortrait';

const CharactersPage = () => {
  return (<div className={'HomePage'}>
    <CharacterSelectionPage/>
  </div>);
};

const CharacterSelectionPage = () => {

  const [characters, setCharacters] = useState(null);

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
        {characterPanels} <Grid item>
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
      <CharacterPortrait {...character} />
    </Link>
  </Grid>;

export default CharactersPage;


