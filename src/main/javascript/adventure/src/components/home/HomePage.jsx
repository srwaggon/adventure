import './HomePage.css';

import React, {useEffect, useState} from 'react';

import {getCurrentPlayersCharacters, postNewCharacter} from '../../utilities/client';
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

  const characterPanels = (characters || []).map(
    character => <CharacterPanel character={character}/>);

  return <div className={'character-selection-page'}>
    <h1>Select a Character</h1>
    <div className={'character-selections-panel'}>
      {characterPanels}
      <div className={'character-new-panel character-panel'}>
        <div className={'character-new-panel-plus'}
             onClick={() => postNewCharacter().then(value => setCharacters(null))}>
          +
        </div>
      </div>
    </div>
  </div>;
};

const CharacterPanel = ({character}) =>
  <Link
    className={'character-selection-panel character-panel'}
    to={`/characters/${character.id}`}
    style={{
      backgroundImage: 'url("https://cdn.discordapp.com/attachments/823412384311279666/823443211988107264/Travin_the_Human.jpeg")',
      backgroundSize: "170%"
    }}
  >
    <div className={'character-selection-panel-name'}>
      {character.name}
    </div>
  </Link>
;

export default HomePage;
