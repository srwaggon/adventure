import {Box, Card, Container} from "@mui/material";
import {VisualCard} from "../VisualCard/VisualCard.tsx";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {deleteCard} from "../../../utilities/client";
import EditButtonRow from "../../buttons/EditButtonRow/EditButtonRow";
import TitledAppBar from "../../shared/TitledAppBar";
import useCurrentPlayer from "../../player/UseCurrentPlayer";
import {useDeleteDialog} from "../../shared/UseDeleteDialog";
import {CardDetailsTabNavigation} from "./CardDetailsTabNavigation";
import {useFetchCard} from "../card/UseFetchCard";
import {useCardSaver} from "../card/UseCardSaver";

const CardDetailsPage = () => {

  const {cardId} = useParams();

  const navigate = useNavigate();

  const fetchedCard = useFetchCard(cardId);

  const [card, setCard] = useState(null);

  // const [card, setCard] = useState(demoCard2);

  useEffect(() => {
    setCard(fetchedCard);
  }, [setCard, fetchedCard])

  const {name: author} = useCurrentPlayer();

  const [isEditing, setEditing] = useState(false);

  const onEdit = () => setEditing(true);

  const onCancelEdit = () => setEditing(false);

  const saveCard = useCardSaver();

  const onCopy = () => saveCard({...card, id: null, author})
    .then(card => navigate(`/cards/${card.id}`))
    .catch(error => console.log(error));

  const onSave = () => saveCard(!card.id ? {...card, author} : card)
    .then(card => navigate(`/cards/${card.id}`))
    .then(value => setEditing(false))
    .catch(error => console.log(error));

  const onDelete = () => deleteCard(card).then(() => navigate("/cards"));

  const {openDialog, DeleteDialog} = useDeleteDialog(onDelete);

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
                 <CardDetailsTabNavigation {...{card, setCard, isEditing}}/>
               </Card>
             </Box>
           </Container>
           <DeleteDialog/>
         </div>;
};

export default CardDetailsPage;
