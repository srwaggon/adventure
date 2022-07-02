import React from "react";

import {Box, Card, CardContent, CardHeader, Divider} from "@mui/material";

import {CharacterPortraitCard} from "../CharacterPortraitCard/CharacterPortraitCard";
import {CharacterNameField} from "./CharacterName/CharacterNameField";

export const CharacterDetailsContainer = ({character, setCharacter, isEditing, children, onSave}) => {
  const setName = (name) => {
    character.name = name;
    setCharacter(character);
  };
  return <Box>
    <Box display="flex" flexDirection="row-reverse" flexWrap="wrap" justifyContent="space-between">
      <Box display="flex" flexGrow={1} justifyContent="center">
        <Box display="block">
          <CharacterPortraitCard {...{character, setCharacter, isEditing, name: character.name, portraitUrl: character.portraitUrl}}/>
        </Box>
      </Box>

      <Box display="flex" flexGrow={1} justifyContent="center">
        <Card sx={{width: "934px"}}>
          <CardHeader title={
            <CharacterNameField
              character={character}
              setCharacter={setCharacter}
              name={character.name}
              setName={setName}
              onSave={onSave}
            />
          }/>

          <CardContent>
            <Box width={902}>

              <Divider/>

              {children}
            </Box>
          </CardContent>
        </Card>
      </Box>

    </Box>
  </Box>;
};
