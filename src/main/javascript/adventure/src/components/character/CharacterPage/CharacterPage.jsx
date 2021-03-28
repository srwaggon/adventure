import './CharacterPage.css';

import {useHistory, useParams} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import {deleteCharacter, getCharacterById, getCharactersCards, replaceCharacter} from '../../../utilities/client';
import {AppBar, Box, Card, CardContent, Chip, Container, TextField, Toolbar, Typography} from '@material-ui/core';
import CharacterPortraitCard from '../CharacterPortraitCard/CharacterPortraitCard';
import CardsGrid from '../../cards/CardsGrid';
import EditButtonRow from '../../buttons/EditButtonRow/EditButtonRow';
import AddCardToCharacterCard from './AddCardToCharacterCard';
import CharacterAttribute from './CharacterAttribute/CharacterAttribute';
import CharacterResource from './CharacterResource/CharacterResource';
import {arrayRemoveAll, capitalize} from '../../../utilities/kitchen_sink';

const ProficiencyChip = ({proficiency, character, setCharacter, isEditing}) => {
  const proficiencies = character.proficiencies || [];
  const isProficient = proficiencies.indexOf(proficiency) > -1;
  return (isEditing || isProficient) && <Box m={1}>
    <Chip
      label={capitalize(proficiency)}
      clickable
      color={isEditing && isProficient ? 'primary' : 'default'}
      onClick={() => {
        if (isEditing) {
          if (isProficient) {
            arrayRemoveAll(proficiencies, proficiency);
          } else {
            proficiencies.push(proficiency);
          }
        }
        console.log(proficiencies);
        setCharacter({...character, proficiencies});
      }}
    />
  </Box>;
};

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

  const EditCharacterNameTextField = ({character}) =>
    <TextField
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
                      ? <EditCharacterNameTextField character={character}/>
                      : <Typography align='center' variant={'h3'}>{character.name}</Typography>}
                  </Box>
                  <Typography variant='h5'>Attributes</Typography>
                  <Box display='flex' flexWrap='wrap' justifyContent='center'>
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
                  </Box>
                  <Typography variant='h5'>Resources</Typography>
                  <Box display='flex' flexWrap='wrap' justifyContent='center'>
                    <Box pr={'16px'}><CharacterResource {...characterPageProps} resource={'stamina'}/></Box>
                    <Box pr={'16px'}><CharacterResource {...characterPageProps} resource={'confidence'}/></Box>
                    <Box pr={'16px'}><CharacterResource {...characterPageProps} resource={'focus'}/></Box>
                  </Box>
                  <Box display='flex' flexWrap='wrap' justifyContent='center'>
                    <Box pr={'16px'}><CharacterResource {...characterPageProps} resource={'health'}/></Box>
                    <Box pr={'16px'}><CharacterResource {...characterPageProps} resource={'reputation'}/></Box>
                    <Box pr={'16px'}><CharacterResource {...characterPageProps} resource={'mana'}/></Box>
                  </Box>
                </Box>
              </Box>
              <Typography variant='h5'>Proficiencies</Typography>
              <Box display='flex' flexWrap='wrap' flexDirection={'row'}>
                <ProficiencyChip {...characterPageProps} proficiency={'acrobatics'}/>
                <ProficiencyChip {...characterPageProps} proficiency={'animal handling'}/>
                <ProficiencyChip {...characterPageProps} proficiency={'athletics'}/>
                <ProficiencyChip {...characterPageProps} proficiency={'arcana'}/>
                <ProficiencyChip {...characterPageProps} proficiency={'deception'}/>
                <ProficiencyChip {...characterPageProps} proficiency={'history'}/>
                <ProficiencyChip {...characterPageProps} proficiency={'investigation'}/>
                <ProficiencyChip {...characterPageProps} proficiency={'insight'}/>
                <ProficiencyChip {...characterPageProps} proficiency={'intimidation'}/>
                <ProficiencyChip {...characterPageProps} proficiency={'medicine'}/>
                <ProficiencyChip {...characterPageProps} proficiency={'nature'}/>
                <ProficiencyChip {...characterPageProps} proficiency={'perception'}/>
                <ProficiencyChip {...characterPageProps} proficiency={'religion'}/>
                <ProficiencyChip {...characterPageProps} proficiency={'performance'}/>
                <ProficiencyChip {...characterPageProps} proficiency={'persuasion'}/>
                <ProficiencyChip {...characterPageProps} proficiency={'sleight of hand'}/>
                <ProficiencyChip {...characterPageProps} proficiency={'stealth'}/>
                <ProficiencyChip {...characterPageProps} proficiency={'survival'}/>
              </Box>
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