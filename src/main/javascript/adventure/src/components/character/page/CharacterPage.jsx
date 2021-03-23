import './CharacterPage.css';
import {useHistory, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {deleteCharacter, getCharacterById, replaceCharacter} from '../../../utilities/client';
import {Card, IconButton, Paper, TextField} from '@material-ui/core';
import {AddBox, Backspace} from '@material-ui/icons';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

const EditCharacterNameTextField = (character) => <TextField
  id={'character-name'}
  defaultValue={character.name}
  variant={'filled'}
  onChange={event => character.name = event.target.value}
/>;

const CharacterPage = () => {

  const {characterId} = useParams();

  const [character, setCharacter] = useState(null);

  const [isEditing, setEditing] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (!character) {
      getCharacter();
    }
  });

  function getCharacter() {
    getCharacterById(characterId)
      .then(data => data.json())
      .then(json => setCharacter(json));
  }

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

    function setCharacterResource(number) {
      character[resource].value += number;
      replaceCharacter(character).then(ignored => getCharacter());
    }

    function increaseMaximum() {
      character[resource].maximum += 1;
      setCharacter({...character});
    }

    function reduceMaximum() {
      character[resource].maximum -= 1;
      setCharacter({...character});
    }

    return (
      <div className="character-resource">
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
      </div>
    );
  };

  const DeleteCharacterButton = () => <IconButton
    aria-label={'delete'}
    color={'secondary'}
    onClick={() => deleteCharacter(character).then(() => history.push('/characters'))}>
    <DeleteIcon fontSize="small"/>
  </IconButton>;

  const CancelEditingButton = () => <IconButton
    aria-label={'cancel'}
    color={'default'}
    onClick={ignored => {
      setEditing(false);
      getCharacter();
    }}>
    <CancelIcon/>
  </IconButton>;

  const SaveCharacterEditsButton = () => <IconButton
    className={'character-edit-button'}
    aria-label={'save'}
    variant={'contained'}
    color={'primary'}
    onClick={ignored => {
      setEditing(false);
      replaceCharacter(character).then(ignored => getCharacter());
    }}>
    <SaveIcon/>
  </IconButton>;

  const EditCharacterButton = () => <IconButton
    className={'character-edit-button'}
    aria-label={'edit'}
    variant={'contained'}
    color={'default'}
    onClick={ignored => setEditing(true)}>
    <EditIcon/>
  </IconButton>;

  return !character ? <div>Loading...</div> : (
    <Paper className="character-page">
      <Card className={'character-page-wrapper'}>
        <div className={'character-page-header'}>
          {isEditing
            ? <EditCharacterNameTextField character={character}/>
            : <div className={'character-name'}>{character.name}</div>}

          <div className={'character-edit-button-row'}>
            {isEditing && <DeleteCharacterButton/>}
            {isEditing && <CancelEditingButton/>}
            {isEditing && <SaveCharacterEditsButton/>}
            {!isEditing && <EditCharacterButton/>}
          </div>

        </div>
        <div className={'character-page-content'}>
          <div className="character-attributes">
            <div className="character-attribute-col">
              <CharacterAttribute character={character} attribute={'strength'}/>
              <CharacterAttribute character={character} attribute={'dexterity'}/>
              <CharacterAttribute character={character} attribute={'constitution'}/>
            </div>
            <div className="character-attribute-col">
              <CharacterAttribute character={character} attribute={'presence'}/>
              <CharacterAttribute character={character} attribute={'influence'}/>
              <CharacterAttribute character={character} attribute={'composure'}/>
            </div>
            <div className="character-attribute-col">
              <CharacterAttribute character={character} attribute={'intelligence'}/>
              <CharacterAttribute character={character} attribute={'wits'}/>
              <CharacterAttribute character={character} attribute={'resolve'}/>
            </div>
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
      </Card>
    </Paper>
  );
};

const blankCharacter = () => {
  return {
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
  };
};

export default CharacterPage;