import './HomePage.css';

import React, {useEffect, useState} from 'react';

import {getCurrentPlayersCharacters, putNewCharacter} from '../../utilities/client';
import {Link} from 'react-router-dom';

const HomePage = () => {
  return (<div className={'HomePage'}>
    <CharacterSelectionPage/>
  </div>);
};

const CharacterSelectionPage = () => {

  const [characters, setCharacters] = useState(null);

  useEffect(() => {
    if (characters !== null) {
      return;
    }
    getCurrentPlayersCharacters()
      .then(response => response.json())
      .then(json => setCharacters(json));
  });

  const characterPanels = (characters || []).map(character => <Link to={`/character/${character.id}`}><CharacterPanel character={character}/></Link>);

  const newCharacter = () => ({'name': 'Travin'});

  return <div className={'character-selection-page'}>
    <h1>Select a Character</h1>
    <div className={'character-selections-panel'}>
      {characterPanels}
      <div className={'character-new-panel character-panel'}>
        <div className={'character-new-panel-plus'}
             onClick={() => putNewCharacter(newCharacter()).then(value => setCharacters(null))}>
          +
        </div>
      </div>
    </div>
  </div>;
};

const CharacterPanel = ({character}) =>
  <div className={'character-selection-panel character-panel'}>
    {character.name}
  </div>;

export default HomePage;
