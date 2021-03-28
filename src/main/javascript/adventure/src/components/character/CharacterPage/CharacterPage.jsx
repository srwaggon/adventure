import './CharacterPage.css';

import {useHistory, useParams} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import {deleteCharacter, getCharacterById, getCharactersCards, replaceCharacter} from '../../../utilities/client';
import {
  AppBar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import CharacterPortraitCard from '../CharacterPortraitCard/CharacterPortraitCard';
import CardsGrid from '../../cards/CardsGrid';
import EditButtonRow from '../../buttons/EditButtonRow/EditButtonRow';
import AddCardToCharacterCard from './AddCardToCharacterCard';
import CharacterAttribute from './CharacterAttribute/CharacterAttribute';
import CharacterResource from './CharacterResource/CharacterResource';

const CharacterPage = () => {

  const {characterId} = useParams();

  const [character, setCharacter] = useState(undefined);

  const [cards, setCards] = useState([]);

  const [isEditing, setEditing] = useState(false);

  const history = useHistory();

  function fetchCharactersCards(character) {
    getCharactersCards(character.id)
      .then(response => response.json())
      .then(setCards);
  }

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

  const EditCharacterNameTextField = ({character}) => <TextField
    label={'Name'}
    defaultValue={character.name}
    variant={'outlined'}
    fullWidth
    onChange={event => {
      character.name = event.target.value;
      setCharacter(character);
    }}
  />;

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

  const characterPageProps = {character, setCharacter, isEditing, setEditing};

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
            <CardHeader title={
              isEditing
                ? <EditCharacterNameTextField character={character}/>
                : <Typography variant={'h3'}>{character.name}</Typography>}
            />
            <CardContent>
              <div className={'character-card-content'}>
                <div className="character-attributes">
                  <Box className="character-attributes-group" padding={1}>
                    <CharacterAttribute {...characterPageProps} attribute={'strength'}/>
                    <CharacterAttribute {...characterPageProps} attribute={'dexterity'}/>
                    <CharacterAttribute {...characterPageProps} attribute={'constitution'}/>
                  </Box>
                  <Box className="character-attributes-group" padding={1}>
                    <CharacterAttribute {...characterPageProps} attribute={'presence'}/>
                    <CharacterAttribute {...characterPageProps} attribute={'influence'}/>
                    <CharacterAttribute {...characterPageProps} attribute={'composure'}/>
                  </Box>
                  <Box className="character-attributes-group" padding={1}>
                    <CharacterAttribute {...characterPageProps} attribute={'intelligence'}/>
                    <CharacterAttribute {...characterPageProps} attribute={'wits'}/>
                    <CharacterAttribute {...characterPageProps} attribute={'resolve'}/>
                  </Box>
                </div>
                <div className={'character-resources'}>
                  <div className="character-resource-row">
                    <CharacterResource {...characterPageProps} resource={'stamina'}/>
                    <CharacterResource {...characterPageProps} resource={'confidence'}/>
                    <CharacterResource {...characterPageProps} resource={'focus'}/>
                  </div>
                  <div className="character-resource-row">
                    <CharacterResource {...characterPageProps} resource={'health'}/>
                    <CharacterResource {...characterPageProps} resource={'reputation'}/>
                    <CharacterResource {...characterPageProps} resource={'mana'}/>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Box>
        <Box p={1}>
          <Card>
            <CardContent>
              <CharacterPortraitCard {...character}/>
              {isEditing && <TextField
                label='Portrait URL'
                variant='outlined'
                margin='dense'
                fullWidth
                defaultValue={character['portraitUrl']}
                onChange={event => setCharacter({...character, portraitUrl: event.target.value})}/>}
            </CardContent>
          </Card>
        </Box>
        <Box p={1}>
          <Card>
            <AppBar color='default' position='static'>
              <Toolbar>
                <Typography variant='h6' style={{flexGrow: 1}}>Cards</Typography>
                <EditButtonRow {...{isEditing, onEdit, onCancelEdit, onSave, onDelete}}/>
              </Toolbar>
            </AppBar>
            <CardContent>
              <CardsGrid cards={cards}/>
            </CardContent>
          </Card>
        </Box>
        <Box p={1}>
          <AddCardToCharacterCard characterId={characterId}/>
        </Box>
      </Container>
    </div>;
};

export default CharacterPage;