import './CharacterPage.css';
import {useHistory, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {deleteCharacter, getCharacterById, replaceCharacter} from '../../../utilities/client';
import {Checkbox, IconButton} from '@material-ui/core';
import {AddBox, Backspace} from '@material-ui/icons';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';

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
            <Checkbox
              key={attribute}
              color={'default'}
              size={'small'}
              style={{margin: '-9px'}}
              checked={int < value}
            />,
          )}
          {isEditing && value > 1 && <Checkbox
            checked={false}
            color={'default'}
            size={'small'}
            style={{margin: '-9px'}}
            icon={<Backspace/>}
            onClick={reduceValue}
          />}
          {isEditing && value < 5 && <Checkbox
            checked={false}
            color={'default'}
            size={'small'}
            style={{margin: '-9px'}}
            icon={<AddBox/>}
            onClick={increaseValue}
          />}
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
              <Checkbox
                key={resource}
                checked={int < value}
                disabled={int >= max}
                color={'default'}
                size={'small'}
                style={{margin: '-9px'}}
                onChange={(e) => setCharacterResource(e.target.checked ? 1 : -1)}
              />)}
          {isEditing && <Checkbox
            checked={false}
            color={'default'}
            size={'small'}
            style={{margin: '-9px'}}
            icon={<Backspace/>}
            onClick={reduceMaximum}
          />}
          {isEditing && <Checkbox
            checked={false}
            color={'default'}
            size={'small'}
            style={{margin: '-9px'}}
            icon={<AddBox/>}
            onClick={increaseMaximum}
          />}
        </div>
      </div>
    );
  };

  return !character ? <div>Loading...</div> : (
    <div className="character-page">
      <div className={'character-page-wrapper'}>
        <div className={'character-page-header'}>
          <div className={'character-name'}>{character.name}</div>
          <div className={'character-edit-button-row'}>
            {isEditing && <IconButton
              aria-label={'delete'}
              color={"secondary"}
              onClick={() => deleteCharacter(character).then(() => history.push("/characters"))}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>}
            <IconButton
              className={'character-edit-button'}
              variant={'contained'}
              color={'default'}
              onClick={ignored => {
                if (isEditing) {
                  replaceCharacter(character).then(ignored => getCharacter());
                }
                setEditing(!isEditing);
              }}>
              {isEditing ? <SaveIcon/> : <EditIcon/>}
            </IconButton>
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
      </div>
    </div>
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