import './CharacterPage.css';

import {useHistory, useParams} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import {deleteCharacter, getCharacterById, getCharactersCards, replaceCharacter} from '../../../utilities/client';
import {Box, Container} from '@material-ui/core';
import EditButtonRow from '../../buttons/EditButtonRow/EditButtonRow';
import AddCardToCharacterCard from './AddCardToCharacterCard';
import CharacterCards from './CharacterCards';
import TitledAppBar from '../../shared/TitledAppBar';
import CharacterDetails from './../CharacterDetails';

const CharacterPage = () => {

  const {characterId} = useParams();
  const history = useHistory();

  const [character, setCharacter] = useState(undefined);
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

  const [cards, setCards] = useState([]);
  const fetchCharactersCards = character => {
    getCharactersCards(character.id)
      .then(response => response.json())
      .then(setCards);
  };

  const [isEditing, setEditing] = useState(false);

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

  const characterPageState = {character, setCharacter, cards, setCards, isEditing, setEditing};

  return !character
    ? <div>Loading...</div>
    : <div>
      <TitledAppBar title={'Character Details'}>
        <EditButtonRow {...{isEditing, onEdit, onCancelEdit, onSave, onDelete}}/>
      </TitledAppBar>
      <Container>
        <Box p={1}>
          <CharacterDetails character={character} setCharacter={setCharacter} isEditing={isEditing}/>
        </Box>
        <Box p={1}>
          <CharacterCards {...characterPageState} {...{fetchCharactersCards}}/>
        </Box>
        {isEditing && <Box p={1}>
          <AddCardToCharacterCard {...characterPageState}/>
        </Box>}
      </Container>
    </div>;
};

export default CharacterPage;