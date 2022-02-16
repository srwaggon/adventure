import "./CharacterPortraitCard.css";

import {Box, Card, Typography} from "@mui/material";
import React from "react";

const CharacterPortraitCard = ({name, portraitUrl}) =>
  <Card className={"character-portrait-card"}>
    <Box className={"character-portrait-image-container"}>
      <img className={"character-portrait-image"} alt={"character portrait"}
           src={portraitUrl
                || "https://i1.wp.com/nerdarchy.com/wp-content/uploads/2020/04/dd-fighters.jpg"}/>
    </Box>
    <Box p={1}>
      <Typography variant="h6">{name}</Typography>
    </Box>
  </Card>;

export default CharacterPortraitCard;
