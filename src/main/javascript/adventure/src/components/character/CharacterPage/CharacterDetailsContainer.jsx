import React from "react";

import {Box, Card, CardContent, Divider, Typography} from "@mui/material";

import {CharacterPortraitCard} from "../CharacterPortraitCard/CharacterPortraitCard";
import {EditCharacterNameTextField} from "./EditCharacterNameTextField";

export const CharacterDetailsContainer = ({character, setCharacter, isEditing, children}) => {
  return <Box>
    <Box display="flex" flexDirection="row-reverse" flexWrap="wrap" justifyContent="space-between">
      <Box display="flex" flexGrow={1} justifyContent="center">
        <Box display="block">
          <CharacterPortraitCard {...{character, setCharacter, isEditing, name: character.name, portraitUrl: character.portraitUrl}}/>
        </Box>
      </Box>

      <Box display="flex" flexGrow={1} justifyContent="center">
        <Card>
          <CardContent>
            <Box width={902}>
              <Box display="flex" flexGrow={3} p={1}>
                {isEditing
                  ? <EditCharacterNameTextField character={character} setCharacter={setCharacter}/>
                  : <Typography align="center" variant={"h3"}>{character.name}</Typography>}
              </Box>

              <Divider/>

              {children}
            </Box>
          </CardContent>
        </Card>
      </Box>

    </Box>
  </Box>;
};
