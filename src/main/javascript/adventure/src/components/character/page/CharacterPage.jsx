import './CharacterPage.css';
import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {getCharacterById} from '../../../utilities/client';

const CharacterPage = () => {

  const {characterId} = useParams();

  const [character, setCharacter] = useState(blankCharacter());

  useEffect(() => {
    if (!character) {
      getCharacterById(characterId)
        .then(data => data.json())
        .then(json => setCharacter(json));
    }
  });

  return !character ? <div>Loading...</div> : (
    <div className="character-page">
      <div className={'character-page-contents'}>
        <div className={'character-name'}>{character.name}</div>
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
        <div className="character-resource-row">
          <CharacterResource character={character} resource={'stamina'}/>
          <CharacterResource character={character} resource={'confidence'}/>
          <CharacterResource character={character} resource={'focus'}/>
        </div>
        <div className="character-resource-row">
          <CharacterResource character={character} resource={'health'}/>
          <CharacterResource character={character} resource={'willpower'}/>
        </div>
        <div className={"character-edit-button-row"}>
          <button className={"character-edit-button"}>Edit</button>
        </div>
      </div>
    </div>
  );
};

const CharacterAttribute = ({character, attribute}) => {
  const value = character[attribute].value;
  return (
    <div className="character-attribute">
      <div className="character-attribute-name">{attribute}</div>
      <div className="character-attribute-value">
        {[...Array(value).keys()].map((int) => <input type="checkbox" key={attribute} checked={int < value}/>)}
      </div>
    </div>
  );
};

const CharacterResource = ({character, resource}) => {
  const max = character[resource].maximum;
  const value = character[resource].value;
  return (
    <div className="character-resource">
      <div className={'character-resource-name'}>{resource}</div>
      <div className="character-resource-value">
        {[...Array(max).keys()].map(
          (int) =>
            <input
              type={'checkbox'}
              key={int}
              checked={int < value}
              disabled={int >= max}
            />)}
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