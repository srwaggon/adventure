import {Box, Card, Container, FormControlLabel, Switch, TextField} from "@mui/material";
import {VisualCard} from "../VisualCard/VisualCard.tsx";
import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {deleteCard, getCardById, postNewCard, replaceCard} from "../../../utilities/client";
import EditButtonRow from "../../buttons/EditButtonRow/EditButtonRow";
import CardTypeSelect from "../CardTypeSelect";
import TitledAppBar from "../../shared/TitledAppBar";
import useCurrentPlayer from "./../../player/UseCurrentPlayer";
import CardQualitySelect from "../CardQualitySelect";
import {useDeleteDialog} from "../../shared/UseDeleteDialog";
import CardEditionSelect from "../CardEditionSelect";

const newCard = () => ({
  name: undefined,
  image: "https://cdn.discordapp.com/attachments/783098091603361842/824651378960891904/unknown.png",
  imageSize: "100%",
  type: "ABILITY",
  body: undefined,
  flavor: undefined,
});

const CardDetailsPage = () => {

  const {cardId} = useParams();
  const [card, setCard] = useState(null);

  useEffect(() => {
    function getCard() {
      getCardById(cardId)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(`${response.status}: ${response.statusText}`);
        })
        .then(setCard)
        .catch((error) => {
          console.log(error);
          setCard({...newCard()});
        });
    }

    if (card) {
      return;
    }
    if (!cardId || cardId === "new") {
      setCard({...newCard()});
    } else {
      getCard();
    }
  }, [cardId, card]);

  const {name: author} = useCurrentPlayer();

  const history = useHistory();
  const [isEditing, setEditing] = useState(false);
  const onEdit = () => setEditing(true);
  const onCancelEdit = () => setEditing(false);
  const onCopy = () => postNewCard({...card, id: null, author})
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(card => history.push(`/cards/${card.id}`));
  const onSave = () => (!card.id ? postNewCard({...card, author}) : replaceCard(card))
    .then(response => {
      setEditing(false);
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(card => history.push(`/cards/${card.id}`))
    .catch(error => console.log(error));
  const onDelete = () => deleteCard(card).then(() => history.push("/cards"));

  const {openDialog, DeleteDialog} = useDeleteDialog(`Delete card ${card?.name || ""}?`, onDelete);

  return !card
    ? <span>Loading...</span>
    : <div>
      <TitledAppBar title={"Card Details"}>
        <EditButtonRow {...{isEditing, onEdit, onCancelEdit, onCopy, onSave, onDelete: openDialog}}/>
      </TitledAppBar>
      <Container>
        <Box p={4} display="flex" flexDirection="row" justifyContent="space-evenly" flexWrap="wrap">
          <VisualCard {...card} />
          <Card>
            <Box p={4} display="flex" flexDirection="column" width={"20rem"}>
              <TextField label={"Name"} variant={"outlined"} fullWidth margin={"dense"}
                         defaultValue={card.name} onChange={event => setCard({...card, name: event.target.value})}/>
              <TextField label={"Image URL"} variant={"outlined"} fullWidth margin={"dense"}
                         defaultValue={card.image} onChange={event => setCard({...card, image: event.target.value})}/>
              <TextField label={"Image size"} variant={"outlined"} fullWidth margin={"dense"}
                         defaultValue={card.imageSize}
                         onChange={event => setCard({...card, imageSize: event.target.value})}/>
              <CardTypeSelect defaultValue={card.type} onSelect={type => setCard({...card, type})}/>
              <CardQualitySelect defaultValue={card.quality} onSelect={quality => setCard({...card, quality})}/>
              <CardEditionSelect defaultValue={card.editionId}
                                 onSelect={editionId => setCard({...card, editionId})}/>
              <TextField label={"Font Size"}
                         variant={"outlined"}
                         fullWidth margin={"dense"}
                         defaultValue={card.fontSize}
                         onChange={event => setCard({...card, fontSize: event.target.value})}/>
              <TextField label={"Body"}
                         multiline variant={"outlined"}
                         rows={4}
                         fullWidth
                         margin={"dense"}
                         defaultValue={card.body}
                         onChange={event => setCard({...card, body: event.target.value})}/>
              <TextField label={"Flavor"}
                         multiline
                         variant={"outlined"}
                         rows={2}
                         fullWidth
                         margin={"dense"}
                         defaultValue={card.flavor}
                         onChange={event => setCard({...card, flavor: event.target.value})}/>
              <FormControlLabel
                label="Dark Text"
                control={
                  <Switch
                    checked={card.darkText}
                    onChange={event => setCard({...card, darkText: event.target.checked})}
                    color="primary"
                    inputProps={{"aria-label": "primary checkbox"}}/>}/>
            </Box>
          </Card>
        </Box>
      </Container>
      <DeleteDialog/>
    </div>;
};

export default CardDetailsPage;
