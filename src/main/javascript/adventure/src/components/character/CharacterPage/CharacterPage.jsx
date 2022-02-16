import {useHistory, useParams} from "react-router-dom";
import React, {useState} from "react";
import {deleteCharacter, getCharacterById, replaceCharacter} from "../../../utilities/client";
import {Box, Card, CardContent, CircularProgress, Container} from "@mui/material";
import EditButtonRow from "../../buttons/EditButtonRow/EditButtonRow";
import AddCardToCharacterCard from "./AddCardToCharacterCard";
import CharacterCards from "./CharacterCards";
import TitledAppBar from "../../shared/TitledAppBar";
import CharacterDetails from "./../CharacterDetails";
import {useCharacter} from "../UseCharacter";
import {useCharactersCards} from "../UseCharactersCards";
import {useDeleteDialog} from "../../shared/UseDeleteDialog";

const CharacterPage = () => {

  const {characterId} = useParams();
  const {character, setCharacter} = useCharacter(characterId);
  const {cards, setCards} = useCharactersCards(character);

  const [isEditing, setEditing] = useState(false);

  const history = useHistory();

  const onDelete = () => deleteCharacter(character).then(() => history.push('/characters'));

  const onCancelEdit = ignored => {
    setEditing(false);
    getCharacterById(character.id)
      .then(response => response.json())
      .then(setCharacter);
  };

  const onSave = ignored => {
    setEditing(false);
    replaceCharacter({...character, cards: cards.map(card => card.id)})
      .then(response => response.json())
      .then(setCharacter);
  };

  const onEdit = ignored => setEditing(true);

  const characterPageState = {character, setCharacter, cards, setCards, isEditing, setEditing};

  const {openDialog, DeleteDialog} = useDeleteDialog(`Really delete ${character?.name || ''}`, onDelete);

  return !character
    ? <CircularProgress/>
    : <div>
      <TitledAppBar title={'Character Details'}>
        <EditButtonRow {...{isEditing, onEdit, onCancelEdit, onSave, onDelete: openDialog}}/>
      </TitledAppBar>
      <Container>
        <Box p={1}>
          <Card>
            <CardContent>
              <CharacterDetails character={character} setCharacter={setCharacter} isEditing={isEditing}/>
            </CardContent>
          </Card>
        </Box>
        <Box p={1}>
          <CharacterCards {...characterPageState}/>
        </Box>
        {isEditing && <Box p={1}>
          <AddCardToCharacterCard {...characterPageState}/>
        </Box>}
      </Container>
      <DeleteDialog/>
    </div>;
};

export default CharacterPage;
