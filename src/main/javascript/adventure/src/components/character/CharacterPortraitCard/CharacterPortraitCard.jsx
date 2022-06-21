import "./CharacterPortraitCard.css";

import {Box, Card, Divider, TextField, Typography} from "@mui/material";
import React from "react";

const CharacterPortraitCard = ({name, portraitUrl, character, setCharacter, isEditing}) =>
  <Card className={"character-portrait-card"}>
    <Box className={"character-portrait-image-container"}>
      <img className={"character-portrait-image"} alt={"character portrait"}
           src={portraitUrl
           || "https://i1.wp.com/nerdarchy.com/wp-content/uploads/2020/04/dd-fighters.jpg"}/>
    </Box>
    <Box p={1}>
      <Typography variant="h6">{name}</Typography>
    </Box>


    {isEditing && <>
      <Divider/>
      <Box p={1}>
        <TextField
          label="Portrait URL"
          variant="outlined"
          margin="dense"
          fullWidth
          defaultValue={character["portraitUrl"]}
          onChange={event => setCharacter({...character, portraitUrl: event.target.value})}/>
      </Box>
    </>}


  </Card>;

export default CharacterPortraitCard;
