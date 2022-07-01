import {Badge, Box, Card} from "@mui/material";
import {Link} from "react-router-dom";
import {VisualCard} from "../../../cards/VisualCard/VisualCard";
import DeleteButton from "../../../buttons/DeleteButton";
import BrokenImageButton from "../../../buttons/BrokenImageButton";
import PlayButton from "../../../buttons/PlayButton";
import SendButton from "../../../buttons/SendButton";
import React from "react";

export const CharacterCard = ({card, removeCardFromCharacter, onPlay}) =>
  <Card>
    <Link to={`/cards/${card.id}`} style={{textDecoration: "none"}}>
      <VisualCard {...card}/>
    </Link>
    <Box display="flex" flexDirection="row">
      <DeleteButton onClick={() => removeCardFromCharacter(card)}/>
      <Badge badgeContent={4} color="secondary" overlap="circular">
        <BrokenImageButton/>
      </Badge>
      <PlayButton onClick={() => onPlay(card)}/>
      <SendButton/>
    </Box>
  </Card>;
