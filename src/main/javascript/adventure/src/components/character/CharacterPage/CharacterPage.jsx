import {useNavigate, useParams} from "react-router-dom";
import React, {useState} from "react";
import {deleteCharacter, getCharacterById, replaceCharacter} from "../../../utilities/client";
import {Box, CircularProgress, Container} from "@mui/material";
import EditButtonRow from "../../buttons/EditButtonRow/EditButtonRow";
import AddCardToCharacterCard from "./AddCardToCharacterCard";
import {TabbedCharacterPanels} from "./TabbedCharacterPanel/TabbedCharacterPanels";
import TitledAppBar from "../../shared/TitledAppBar";
import {CharacterDetailsContainer} from "./CharacterDetailsContainer";
import {useCharacter} from "../UseCharacter";
import {useCharactersCards} from "../UseCharactersCards";
import {useDeleteDialog} from "../../shared/UseDeleteDialog";

export const CharacterPage = () => {

  const {characterId} = useParams();
  const {character, setCharacter} = useCharacter(characterId);
  const {cards, setCards} = useCharactersCards(character);

  const [isEditing, setEditing] = useState(false);

  const navigate = useNavigate();

  const onDelete = () => deleteCharacter(character).then(() => navigate("/characters"));

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

  const {openDialog, DeleteDialog} = useDeleteDialog(`Really delete ${character?.name || ""}`, onDelete);

  return !character
    ? <CircularProgress/>
    : <div>
      <TitledAppBar title={"Character Details"}>
        <EditButtonRow {...{onEdit, onCancelEdit, onSave, onDelete: openDialog}}/>
      </TitledAppBar>
      <Container maxWidth={false}>
        <Box p={1}>
          <CharacterDetailsContainer {...{character, setCharacter, onSave}}>
            <TabbedCharacterPanels {...{character, setCharacter, cards, setCards}}/>
          </CharacterDetailsContainer>
        </Box>
        {isEditing && <Box p={1}>
          <AddCardToCharacterCard {...characterPageState}/>
        </Box>}
      </Container>
      <DeleteDialog/>
    </div>;
};
