import './HomePage.css';

import React, {useEffect, useState} from 'react';

import {getCurrentPlayersCharacters, postNewCharacter} from '../utilities/client';

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

  const characterPanels = (characters || []).map(character => <CharacterPanel character={character}/>);

  const newCharacter = () => ({'name': 'Travin'});

  return <div className={'character-selection-page'}>
    <h1>Select a Character</h1>
    <div className={'character-selections-panel'}>
      {characterPanels}
      <div className={'character-new-panel character-panel'}>
        <div className={'character-new-panel-plus'}
             onClick={() => postNewCharacter(newCharacter()).then(value => setCharacters(null))}>
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
