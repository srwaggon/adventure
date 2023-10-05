import {Box, Container} from "@mui/material";
import {VisualCard} from "../VisualCard/VisualCard.tsx";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import TitledAppBar from "../../shared/TitledAppBar";
import {useDeleteDialog} from "../../shared/UseDeleteDialog";
import {CardDetailsTabNavigation} from "./CardDetailsTabNavigation";
import {useFetchCard} from "../card/UseFetchCard";
import {CardContext} from "./CardContext";
import {CardDetailsEditButtonRow} from "./CardDetailsEditButtonRow";
import {EditingContext} from "./EditingContext";
import {deleteCard} from "../../../utilities/client";

const CardDetailsPage = () => {

  const {cardId} = useParams();

  const fetchedCard = useFetchCard(cardId);

  const [card, setCard] = useState(null);
  // const [card, setCard] = useState(demoCard2);

  useEffect(() => {
    setCard(fetchedCard);
  }, [setCard, fetchedCard])

  const [isEditing, setEditing] = useState(false);

  const navigate = useNavigate();

  const onDelete = () => deleteCard(card).then(() => navigate("/cards"));

  const {openDialog, DeleteDialog} = useDeleteDialog(onDelete);

  return !card
         ? <span>Loading...</span>
         : <div>
           <CardContext.Provider value={[card, setCard]}>
             <EditingContext.Provider value={[isEditing, setEditing]}>
               <TitledAppBar title={"Card Details"}>
                 <CardDetailsEditButtonRow openDialog={openDialog}/>
               </TitledAppBar>
               <Container>
                 <Box pt={4}
                      display="flex"
                      flexDirection="row"
                      justifyContent="space-evenly"
                      flexWrap="wrap">
                   <VisualCard {...card}/>
                   <Box sx={{m: 2}}/>
                   <CardDetailsTabNavigation {...{isEditing}}/>
                 </Box>
               </Container>
             </EditingContext.Provider>
             <DeleteDialog/>
           </CardContext.Provider>
         </div>;
};

export default CardDetailsPage;
