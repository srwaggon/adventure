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
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import {AddBox, Backspace} from '@material-ui/icons';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CharacterPortraitCard from '../CharacterPortraitCard/CharacterPortraitCard';
import CardsGrid from '../../cards/CardsGrid';
import EditButtonRow from '../../buttons/EditButtonRow/EditButtonRow';
import AddCardToCharacterCard from './AddCardToCharacterCard';
import CharacterAttribute from './CharacterAttribute';

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

  const CharacterResource = ({character, resource}) => {
    const max = character[resource].maximum;
    const value = character[resource].value;

    const setCharacterResource = number => {
      character[resource].value += number;
      replaceCharacter(character)
        .then(response => response.json())
        .then(character => {
          setCharacter(character);
          fetchCharactersCards(character);
        });
    };

    const increaseMaximum = () => {
      character[resource].maximum += 1;
      setCharacter({...character});
    };

    const reduceMaximum = () => {
      character[resource].maximum -= 1;
      setCharacter({...character});
    };

    return (
      <Box className="character-resource" p={1}>
        <div className={'character-resource-name'}>{resource}</div>
        <div className="character-resource-value">
          {[...Array(max).keys()].map(
            (int) =>
              <IconButton
                key={resource}
                checked={int < value}
                disabled={int >= max}
                color={'default'}
                size={'small'}
                style={{margin: '-4px'}}
                onClick={(ignored) => setCharacterResource(int < value ? -1 : 1)}
              >
                {int < value ? <CheckBoxIcon/> : <CheckBoxOutlineBlankIcon/>}
              </IconButton>)}

          {isEditing && <IconButton
            checked={false}
            color={'primary'}
            size={'small'}
            style={{margin: '-4px'}}
            onClick={reduceMaximum}
          ><Backspace/></IconButton>}
          {isEditing && <IconButton
            checked={false}
            color={'primary'}
            size={'small'}
            style={{margin: '-4px'}}
            fullWidth={true}
            onClick={increaseMaximum}
          ><AddBox/></IconButton>}

        </div>
      </Box>
    );
  };

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
                    <CharacterAttribute {...{character, setCharacter, isEditing, attribute: 'strength'}}/>
                    <CharacterAttribute {...{character, setCharacter, isEditing, attribute: 'dexterity'}}/>
                    <CharacterAttribute {...{character, setCharacter, isEditing, attribute: 'constitution'}}/>
                  </Box>
                  <Box className="character-attributes-group" padding={1}>
                    <CharacterAttribute {...{character, setCharacter, isEditing, attribute: 'presence'}}/>
                    <CharacterAttribute {...{character, setCharacter, isEditing, attribute: 'influence'}}/>
                    <CharacterAttribute {...{character, setCharacter, isEditing, attribute: 'composure'}}/>
                  </Box>
                  <Box className="character-attributes-group" padding={1}>
                    <CharacterAttribute {...{character, setCharacter, isEditing, attribute: 'intelligence'}}/>
                    <CharacterAttribute {...{character, setCharacter, isEditing, attribute: 'wits'}}/>
                    <CharacterAttribute {...{character, setCharacter, isEditing, attribute: 'resolve'}}/>
                  </Box>
                </div>
                <div className={'character-resources'}>
                  <div className="character-resource-row">
                    <CharacterResource character={character} resource={'stamina'}/>
                    <CharacterResource character={character} resource={'reputation'}/>
                    <CharacterResource character={character} resource={'focus'}/>
                  </div>
                  <div className="character-resource-row">
                    <CharacterResource character={character} resource={'health'}/>
                    <CharacterResource character={character} resource={'confidence'}/>
                    <CharacterResource character={character} resource={'mana'}/>
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