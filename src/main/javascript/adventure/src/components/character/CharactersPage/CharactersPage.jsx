import './CharactersPage.css';

import React, {useEffect, useState} from 'react';

import {getCurrentPlayersCharacters, postNewCharacter} from '../../../utilities/client';
import {Link, useHistory} from 'react-router-dom';
import {AppBar, Box, Card, Container, Grid, Toolbar, Typography} from '@material-ui/core';
import CharacterPortraitCard from '../CharacterPortraitCard/CharacterPortraitCard';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AddButton from '../../buttons/AddButton';

const CharactersPage = () => {
  return (<div className={'HomePage'}>
    <CharacterSelectionPage/>
  </div>);
};

const CharacterSelectionPage = () => {

  const history = useHistory();

  const [characters, setCharacters] = useState(null);

  const shouldFetchCharacters = characters === null;
  useEffect(() => {
    if (shouldFetchCharacters) {
      getCurrentPlayersCharacters()
        .then(response => response.json())
        .then(json => setCharacters(json));
    }
  }, [shouldFetchCharacters]);

  const characterPortraits = (characters || []).map(character =>
    <Link to={`/characters/${character.id}`} style={{textDecoration: 'none'}}>
      <CharacterPortraitCard {...(character)} />
    </Link>);

  const onClickCreateCharacter = () =>
    postNewCharacter()
      .then(response => response.json())
      .then(character => history.push(`/characters/${character.id}`));

  return <div className={'character-selection-page'}>
    <AppBar color="default" position={'static'}>
      <Toolbar>
        <Typography variant={'h6'} style={{flexGrow: 1}}>Select a Character</Typography>
        <AddButton onClick={onClickCreateCharacter}/>
      </Toolbar>
    </AppBar>
    <Container>
      <Box p={4}>
        <Grid className={'character-selections-panel'} container justify="center" spacing={4}>
          {characters && characters.length > 0
            ? characterPortraits.map(x => <Grid item>{x}</Grid>)
            : <Grid item>
              <Card className={'character-new-card character-panel'} onClick={onClickCreateCharacter}>
                <Box flexDirection={'column'} justifyContent={'center'} height={'100%'}>
                  <PersonAddIcon style={{fontSize: 128, margin: '0 auto', height: '100%'}}/>
                </Box>
              </Card>
            </Grid>}
        </Grid>
      </Box>
    </Container>
  </div>;
};

export default CharactersPage;


