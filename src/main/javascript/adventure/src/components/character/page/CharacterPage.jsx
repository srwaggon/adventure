import './CharacterPage.css';

import {useHistory, useParams} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import {
  deleteCharacter,
  getAllCards,
  getCharacterById,
  getCharactersCards,
  replaceCharacter,
} from '../../../utilities/client';
import {
  AppBar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
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

const AddCardToCharacterCard = ({characterId}) => {

  const [cards, setCards] = useState([]);

  const [filterTerm, setFilterTerm] = useState('');
  
  useEffect(() => {
    getAllCards()
      .then(response => response.json())
      .then(setCards);
  }, []);

  return <Card>
    <AppBar color='default' position='static'>
      <Toolbar>
        <Typography variant='h6'>Add to Character</Typography>
        <div style={{flexGrow: 1}}/>
        <TextField
          label='Filter by name'
          variant='outlined'
          margin='dense'
          defaultValue={filterTerm}
          onChange={event => setFilterTerm(event.target.value.toLowerCase())}
        />
      </Toolbar>
    </AppBar>
    <CardContent>
      <CardsGrid cards={
        filterTerm.length > 0
          ? cards.filter((card) => card.name.toLowerCase().includes(filterTerm))
          : cards.slice(0,5)
      }/>
    </CardContent>
  </Card>;
};

const CharacterPage = () => {

  const {characterId} = useParams();

  const [character, setCharacter] = useState(undefined);

  const [cards, setCards] = useState(undefined);

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

  const CharacterAttribute = ({character, attribute}) => {
    const value = character[attribute].value;

    function increaseValue() {
      character[attribute].value += 1;
      setCharacter({...character});
    }

    function reduceValue() {
      character[attribute].value -= 1;
      setCharacter({...character});
    }

    return (
      <div className="character-attribute">
        <div className="character-attribute-name">{attribute}</div>
        <div className="character-attribute-value">
          {[...Array(value).keys()].map((int) =>
            <IconButton
              key={attribute}
              color={'default'}
              size={'small'}
              style={{margin: '-4px'}}
              checked={int < value}
            ><CheckBoxIcon/></IconButton>,
          )}
          {isEditing && value > 1 && <IconButton
            checked={false}
            color={'primary'}
            size={'small'}
            style={{margin: '-4px'}}
            onClick={reduceValue}
          ><Backspace/></IconButton>}
          {isEditing && value < 5 && <IconButton
            checked={false}
            color={'primary'}
            size={'small'}
            style={{margin: '-4px'}}
            fullWidth={true}
            onClick={increaseValue}
          ><AddBox/></IconButton>}
        </div>
      </div>
    );
  };

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
      <Box className="character-page" p={4}>
        <Grid container spacing={4} justify={'center'}>
          <Grid item>
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
                      <CharacterAttribute character={character} attribute={'strength'}/>
                      <CharacterAttribute character={character} attribute={'dexterity'}/>
                      <CharacterAttribute character={character} attribute={'constitution'}/>
                    </Box>
                    <Box className="character-attributes-group" padding={1}>
                      <CharacterAttribute character={character} attribute={'presence'}/>
                      <CharacterAttribute character={character} attribute={'influence'}/>
                      <CharacterAttribute character={character} attribute={'composure'}/>
                    </Box>
                    <Box className="character-attributes-group" padding={1}>
                      <CharacterAttribute character={character} attribute={'intelligence'}/>
                      <CharacterAttribute character={character} attribute={'wits'}/>
                      <CharacterAttribute character={character} attribute={'resolve'}/>
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
          </Grid>
          <Grid item>
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
          </Grid>
          <Grid item>
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
          </Grid>
          <Grid item>
            <AddCardToCharacterCard characterId={characterId}/>
          </Grid>
        </Grid>
      </Box>
    </div>;
};

export default CharacterPage;