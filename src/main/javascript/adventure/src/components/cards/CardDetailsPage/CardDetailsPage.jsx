import {Box, Card, Container} from "@mui/material";
import {VisualCard} from "../VisualCard/VisualCard.tsx";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {
  deleteCard,
  getCardById,
  getCardsByIds,
  postNewCard,
  replaceCard
} from "../../../utilities/client";
import EditButtonRow from "../../buttons/EditButtonRow/EditButtonRow";
import TitledAppBar from "../../shared/TitledAppBar";
import useCurrentPlayer from "../../player/UseCurrentPlayer";
import {useDeleteDialog} from "../../shared/UseDeleteDialog";
import {CardDetailsTabNavigation} from "./CardDetailsTabNavigation";

const newCard = () => ({
  name: "New Card",
  fullArt: true,
  image: "https://cdn.discordapp.com/attachments/954643538342182924/963221684985409546/unknown.png",
  imageSize: "cover",
  imagePosition: "center top",
  type: "ABILITY",
  body: null,
  flavor: null,
  author: null,
  quality: "COMMON",
  fontSize: "10pt",
  editionId: "",
  costInExperience: 0,
  darkText: true,
  bodyOpacity: 80,
  prerequisites: {
    "attributePrerequisites": [],
    "skillPrerequisites": [],
    "cardPrerequisites": []
  }
});

const CardDetailsPage = () => {

  const {cardId} = useParams();

  const navigate = useNavigate();

  const [card, setCard] = useState(null);
  // const [card, setCard] = useState(demoCard2);

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

    if (card && (cardId === card.id || cardId === "new")) {
      return;
    }
    if (!cardId || cardId === "new") {
      setCard({...newCard()});
    } else {
      getCard();
    }
  }, [cardId, card]);

  const {name: author} = useCurrentPlayer();

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
    .then(card => navigate(`/cards/${card.id}`));

  const onSave = () => (!card.id ? postNewCard({...card, author}) : replaceCard(card))
    .then(response => {
      setEditing(false);
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(card => navigate(`/cards/${card.id}`))
    .catch(error => console.log(error));

  const onDelete = () => deleteCard(card).then(() => navigate("/cards"));

  const {openDialog, DeleteDialog} = useDeleteDialog(onDelete);

  const setCostInExperience = event => {
    const costInExperienceCost = event.target.value;
    const costInExperienceValue = parseInt(costInExperienceCost);
    const costInExperience = Math.max(0, costInExperienceValue);
    setCard({...card, costInExperience});
  };

  const [cardPrerequisites, setCardPrerequisites] = useState([]);

  useEffect(() => {
    if (!card) {
      return;
    }
    const prerequisites = card.prerequisites || {};
    const cardPrerequisites = prerequisites.cardPrerequisites || [];

    if (cardPrerequisites.length > 0) {
      getCardsByIds(cardPrerequisites)
        .then(response => response.json())
        .then(json => setCardPrerequisites(json));
    }
  }, [card, setCardPrerequisites]);

  const removeCardPrerequisite = (cardPrerequisite) => {
    const {prerequisites, ...other} = card;
    const {cardPrerequisites, ...otherPrerequisites} = prerequisites;
    const filteredCardPrerequisites = cardPrerequisites.filter(
      cp => cp !== cardPrerequisite.id);
    const newCard = {
      ...other,
      prerequisites: {
        ...otherPrerequisites,
        cardPrerequisites: filteredCardPrerequisites
      }
    };
    setCard(newCard);
    setCardPrerequisites(filteredCardPrerequisites);
  };

  return !card
         ? <span>Loading...</span>
         : <div>
           <TitledAppBar title={"Card Details"}>
             <EditButtonRow {...{
               onEdit,
               onCancelEdit,
               onCopy,
               onSave,
               onDelete: openDialog(`Delete card ${card?.name || ""}?`)
             }}/>
           </TitledAppBar>
           <Container>
             <Box pt={4}
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-evenly"
                  flexWrap="wrap">

               <VisualCard {...card}/>
               <Box sx={{m: 2}}/>
               <Card>
                 <CardDetailsTabNavigation {...{
                   card,
                   setCard,
                   isEditing,
                   cardPrerequisites,
                   removeCardPrerequisite,
                   setCostInExperience
                 }}/>
               </Card>
             </Box>
           </Container>
           <DeleteDialog/>
         </div>;
};

export default CardDetailsPage;
