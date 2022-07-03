import "./CharactersPage.css";

import React from "react";

import {postNewCharacter} from "../../../utilities/client";
import {Link, useHistory} from "react-router-dom";
import {Box, Card} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddButton from "../../buttons/AddButton";
import useCurrentPlayersCharacters from "./UseCurrentPlayersCharacters";
import CenteredGridWithAppBar from "../../shared/CenteredGridWithAppBar";
import {CharacterPortraitCard} from "../CharacterPortraitCard";

export const CharactersPage = () => {
  return (<div className={"HomePage"}>
    <CharacterSelectionPage/>
  </div>);
};

const CharacterSelectionPage = () => {

  const history = useHistory();

  const characters = useCurrentPlayersCharacters();

  const characterPortraits = (characters || []).map(character =>
    <Link to={`/characters/${character.id}`} style={{textDecoration: 'none'}}>
      <CharacterPortraitCard characterName={character.name} portraitUrl={character.portraitUrl}/>
    </Link>);

  const onClickCreateCharacter = () =>
    postNewCharacter()
      .then(response => response.json())
      .then(character => history.push(`/characters/${character.id}`));

  return <CenteredGridWithAppBar
    title={'Select a Character'}
    menuItems={<AddButton onClick={onClickCreateCharacter}/>}>
    {characters && characters.length > 0
      ? characterPortraits
      : <Card className={'character-new-card character-panel'} onClick={onClickCreateCharacter}>
        <Box flexDirection={'column'} justifyContent={'center'} height={'100%'}>
          <PersonAddIcon style={{fontSize: 128, margin: '0 auto', height: '100%'}}/>
        </Box>
      </Card>}
  </CenteredGridWithAppBar>;
};
