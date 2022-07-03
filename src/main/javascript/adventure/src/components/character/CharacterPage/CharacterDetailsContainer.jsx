import React from "react";

import {Box, Card, CardContent, CardHeader, Divider} from "@mui/material";

import {CharacterNameField} from "./CharacterName/CharacterNameField";
import {CharacterPortraitCard} from "../CharacterPortraitCard";

export const CharacterDetailsContainer = ({character, setCharacter, children, onSave}) => {
  const setName = (name) => {
    character.name = name;
    setCharacter(character);
  };

  const onSaveCharacterPortrait = (cardId) => {
    character.portraitUrl = cardId;
    setCharacter(character);
    onSave();
  };

  return <Box>
    <Box display="flex" flexDirection="row-reverse" flexWrap="wrap" justifyContent="space-between">

      <Box display="flex" flexGrow={1} justifyContent="center">
        <Box display="block">
          <CharacterPortraitCard
            characterName={character.name}
            portraitUrl={character.portraitUrl}
            onSave={onSaveCharacterPortrait}
          />
        </Box>
      </Box>

      <Box display="flex" flexGrow={1} justifyContent="center">
        <Card sx={{width: "934px"}}>
          <CardHeader title={
            <CharacterNameField
              name={character.name}
              setName={setName}
              onSave={onSave}
            />
          }/>

          <CardContent>
            <Divider/>
            <Box width={902}>
              {children}
            </Box>
          </CardContent>
        </Card>
      </Box>

    </Box>
  </Box>;
};
