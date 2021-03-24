import './CharacterPage.css';

import {useHistory, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {deleteCharacter, getAllCards, getCharacterById, replaceCharacter} from '../../../utilities/client';
import {Box, Card, Grid, IconButton, TextField, Typography} from '@material-ui/core';
import {AddBox, Backspace} from '@material-ui/icons';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CharacterPortraitCard from '../CharacterPortraitCard/CharacterPortraitCard';
import CardsGrid from '../../cards/CardsGrid';
import EditButtonRow from '../../buttons/EditButtonRow/EditButtonRow';

const CharacterPage = () => {

  const {characterId} = useParams();

  const [character, setCharacter] = useState(undefined);

  const [cards, setCards] = useState(undefined);

  const [isEditing, setEditing] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (!character) {
      getCharacter();
    }
  });

  function getCharacter() {
    getCharacterById(characterId)
      .then(response => response.json())
      .then(character => {
        setCharacter(character);
        getAllCards()
          .then(response => response.json())
          .then(cards => setCards(cards.filter(card => character.cards.includes(card.id))));
      });
  }

  const EditCharacterNameTextField = ({character}) => <TextField
    label={'Name'}
    defaultValue={character.name}
    variant={'filled'}
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
      replaceCharacter(character).then(ignored => getCharacter());
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
    getCharacter();
  };

  const onSave = ignored => {
    setEditing(false);
    replaceCharacter(character).then(ignored => getCharacter());
  };

  const onEdit = ignored => setEditing(true);

  return !character
    ? <div>Loading...</div>
    : <Box className="character-page" p={4}>
      <Grid container spacing={4} justify={'center'}>
        <Grid item>
          <Card className={'character-card'}>
            <Box p={4}>
              <Box className={'character-page-header'} p={1}>
                {isEditing
                  ? <EditCharacterNameTextField character={character}/>
                  : <Typography variant={'h3'}>
                    {character.name}
                  </Typography>}
                <EditButtonRow {...{isEditing, onEdit, onCancelEdit, onSave, onDelete}} />

              </Box>
              <div className={'character-page-content'}>
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
                    <CharacterResource character={character} resource={'confidence'}/>
                    <CharacterResource character={character} resource={'focus'}/>
                  </div>
                  <div className="character-resource-row">
                    <CharacterResource character={character} resource={'health'}/>
                    <CharacterResource character={character} resource={'willpower'}/>
                  </div>
                </div>
              </div>
            </Box>
          </Card>
        </Grid>
        <Grid item>
          <CharacterPortraitCard {...character}/>
        </Grid>
        <Grid item>
          <CardsGrid cards={cards}/>
        </Grid>
      </Grid>
    </Box>;
};

export default CharacterPage;