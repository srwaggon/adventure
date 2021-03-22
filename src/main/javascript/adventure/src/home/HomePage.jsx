import './HomePage.css';

import React, {useEffect, useState} from 'react';

const HomePage = () => {
  return (<div className={'HomePage'}>
    <CharacterSelectionPage/>
  </div>);
};

const CharacterSelectionPage = () => {

  const [player, setPlayer] = useState(null);

  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    if (!player) {
      fetch('/players/current')
        .then(response => response.json())
        .then(data => {
          setPlayer(data);
          requestCharacters(data);
        });
    }
  });

  function requestCharacters(player) {
    if (player && player['characters'].length) {
      const characterId = player['characters'][0];
      fetch(`/characters/${characterId}`)
        .then(response => response.json())
        .then(data => {
          setCharacters([data]);
        });
    }
  }

  const characterPanels = characters.map(character => <CharacterPanel character={character}/>);

  const newCharacter = () => ({'name': 'Travin'});

  const postNewCharacter = (character) => {
    fetch('/characters', {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(character),
    })
      .then(value => setPlayer(null));
  };

  return <div className={'character-selection-page'}>
    <h1>Select a Character</h1>
    <div className={'character-selections-panel'}>
      {characterPanels}
      <div className={'character-new-panel character-panel'}>
        <div onClick={() => postNewCharacter(newCharacter())} className={'character-new-panel-plus'}>+</div>
      </div>
    </div>
  </div>;
};

const CharacterPanel = ({character}) =>
  <div className={'character-selection-panel character-panel'}>
    {character.name}
  </div>;

export default HomePage;
