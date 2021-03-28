import './CharacterPage.css';

import {useHistory, useParams} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import {
  deleteCharacter,
  getAllProficiencies,
  getCharacterById,
  getCharactersCards,
  replaceCharacter,
} from '../../../utilities/client';
import {AppBar, Box, Card, CardContent, Container, TextField, Toolbar, Typography} from '@material-ui/core';
import CharacterPortraitCard from '../CharacterPortraitCard/CharacterPortraitCard';
import EditButtonRow from '../../buttons/EditButtonRow/EditButtonRow';
import AddCardToCharacterCard from './AddCardToCharacterCard';
import CharacterAttribute from './CharacterAttribute/CharacterAttribute';
import CharacterResource from './CharacterResource/CharacterResource';
import CharacterCards from './CharacterCards';
import ProficiencyChip from './ProficiencyChip';
import EditCharacterNameTextField from './EditCharacterNameTextField';

const CharacterPage = () => {

  const {characterId} = useParams();
  const history = useHistory();

  const [character, setCharacter] = useState(undefined);
  const shouldFetchCharacter = !character || characterId !== character.id;
  useEffect(() => {
    if (shouldFetchCharacter) {
      getCharacterById(characterId)
        .then(response => response.json())
        .then(character => {
          setCharacter(character);
          fetchCharactersCards(character);
        });
    }
  }, [shouldFetchCharacter, characterId]);

  const [cards, setCards] = useState([]);
  const fetchCharactersCards = character => {
    getCharactersCards(character.id)
      .then(response => response.json())
      .then(setCards);
  };

  const [proficiencies, setProficiencies] = useState([]);
  useEffect(() => {
    getAllProficiencies()
      .then(response => response.json())
      .then(setProficiencies);
  }, []);

  const [isEditing, setEditing] = useState(false);

  const onDelete = () => deleteCharacter(character).then(() => history.push('/characters'));

  const onCancelEdit = ignored => {
    setEditing(false);
    getCharacterById(character.id)
      .then(response => response.json())
      .then(character => {
        setCharacter(character);
        fetchCharactersCards(character);
      });
  };

  const onSave = ignored => {
    setEditing(false);
    replaceCharacter(character)
      .then(response => response.json())
      .then(character => {
        setCharacter(character);
        fetchCharactersCards(character);
      });
  };

  const onEdit = ignored => setEditing(true);

  const characterPageState = {character, setCharacter, cards, setCards, isEditing, setEditing};

  return !character
    ? <div>Loading...</div>
    : <div>
      <AppBar color='default' position='static'>
        <Toolbar>
          <Typography variant='h6' style={{flexGrow: 1}}>Character Details</Typography>
          <EditButtonRow {...{isEditing, onEdit, onCancelEdit, onSave, onDelete}}/>
        </Toolbar>
      </AppBar>
      <Container>
        <Box p={1}>
          <Card className={'character-card'}>
            <CardContent>
              <Box display='flex' flexDirection='row-reverse' flexWrap='wrap' justifyContent='space-between'>
                <Box>
                  <CharacterPortraitCard {...character}/>
                  {isEditing && <Box py={1}>
                    <TextField
                      label='Portrait URL'
                      variant='outlined'
                      margin='dense'
                      fullWidth
                      defaultValue={character['portraitUrl']}
                      onChange={event => setCharacter({...character, portraitUrl: event.target.value})}/>
                  </Box>
                  }
                </Box>
                <Box>
                  <Box display='flex' flexGrow={3} p={1}>
                    {isEditing
                      ? <EditCharacterNameTextField character={character} setCharacter={setCharacter}/>
                      : <Typography align='center' variant={'h3'}>{character.name}</Typography>}
                  </Box>
                  <Typography variant='h5'>Attributes</Typography>
                  <Box display='flex' flexWrap='wrap' justifyContent='center'>
                    <Box className="character-attributes-group" padding={1}>
                      <CharacterAttribute {...characterPageState} attribute={'strength'}/>
                      <CharacterAttribute {...characterPageState} attribute={'dexterity'}/>
                      <CharacterAttribute {...characterPageState} attribute={'constitution'}/>
                    </Box>
                    <Box className="character-attributes-group" padding={1}>
                      <CharacterAttribute {...characterPageState} attribute={'presence'}/>
                      <CharacterAttribute {...characterPageState} attribute={'influence'}/>
                      <CharacterAttribute {...characterPageState} attribute={'composure'}/>
                    </Box>
                    <Box className="character-attributes-group" padding={1}>
                      <CharacterAttribute {...characterPageState} attribute={'intelligence'}/>
                      <CharacterAttribute {...characterPageState} attribute={'wits'}/>
                      <CharacterAttribute {...characterPageState} attribute={'resolve'}/>
                    </Box>
                  </Box>
                  <Typography variant='h5'>Resources</Typography>
                  <Box display='flex' flexWrap='wrap' justifyContent='center'>
                    <Box pr={'16px'}><CharacterResource {...characterPageState} resource={'stamina'}/></Box>
                    <Box pr={'16px'}><CharacterResource {...characterPageState} resource={'confidence'}/></Box>
                    <Box pr={'16px'}><CharacterResource {...characterPageState} resource={'focus'}/></Box>
                  </Box>
                  <Box display='flex' flexWrap='wrap' justifyContent='center'>
                    <Box pr={'16px'}><CharacterResource {...characterPageState} resource={'health'}/></Box>
                    <Box pr={'16px'}><CharacterResource {...characterPageState} resource={'reputation'}/></Box>
                    <Box pr={'16px'}><CharacterResource {...characterPageState} resource={'mana'}/></Box>
                  </Box>
                </Box>
              </Box>
              <Typography variant='h5'>Proficiencies</Typography>
              <Box display='flex' flexWrap='wrap' flexDirection={'row'}>
                {proficiencies.map(proficiency =>
                  <ProficiencyChip {...characterPageState} proficiency={proficiency}/>)}
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box p={1}>
          <CharacterCards {...characterPageState} {...{onEdit, onCancelEdit, onSave, onDelete, fetchCharactersCards}}/>
        </Box>
        {isEditing && <Box p={1}>
          <AddCardToCharacterCard {...characterPageState}/>
        </Box>}
      </Container>
    </div>;
};

export default CharacterPage;