import './CharactersPage.css';

import React, {useEffect, useState} from 'react';

import {getCurrentPlayersCharacters, postNewCharacter} from '../../../utilities/client';
import {Link} from 'react-router-dom';
import {AppBar, Box, Card, Grid, Toolbar, Typography} from '@material-ui/core';
import EditButton from '../../buttons/EditButton';
import CharacterPortraitCard from '../CharacterPortraitCard/CharacterPortraitCard';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

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

  const characterPortraits = (characters || []).map(character =>
    <Grid item>
      <Link to={`/characters/${character.id}`} style={{textDecoration: 'none'}}>
        <CharacterPortraitCard {...(character)} />
      </Link>
    </Grid>);

  return <div className={'character-selection-page'}>
    <AppBar color="default" position={'static'}>
      <Toolbar>
        <Typography variant={'h6'} style={{flexGrow: 1}}>Select a Character</Typography>
        <EditButton/>
      </Toolbar>
    </AppBar>
    <Box p={4}>
      <Grid className={'character-selections-panel'} container justify="center" spacing={4}>
        {characterPortraits}
        <Grid item>
          <Card className={'character-new-card character-panel'}
                onClick={() => postNewCharacter().then(ignored => setCharacters(null))}>
            <Box flexDirection={'column'} justifyContent={'center'} height={'100%'}>
              <PersonAddIcon style={{fontSize: 128, margin: '0 auto', height: '100%'}}/>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  </div>;
};

export default CharactersPage;


