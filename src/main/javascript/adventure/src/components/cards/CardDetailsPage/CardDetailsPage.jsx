import {
  Autocomplete,
  Box,
  Card,
  Container,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Switch,
  TextField,
  Tooltip,
  Typography
} from "@mui/material";
import {VisualCard} from "../VisualCard/VisualCard.tsx";
import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {deleteCard, getCardById, getCardsByIds, postNewCard, replaceCard} from "../../../utilities/client";
import EditButtonRow from "../../buttons/EditButtonRow/EditButtonRow";
import CardTypeSelect from "../CardTypeSelect";
import TitledAppBar from "../../shared/TitledAppBar";
import useCurrentPlayer from "../../player/UseCurrentPlayer";
import CardQualitySelect from "../CardQualitySelect";
import {useDeleteDialog} from "../../shared/UseDeleteDialog";
import CardEditionSelect from "../CardEditionSelect";
import DeleteIcon from "@mui/icons-material/Delete";
import useCards from "../useCards";
import OpacityInput from "./OpacityInput";
import AlcheimTextField from "../../input/AlcheimTextField";
import {ZoomingToolTip} from "../../ZoomingToolTip";

const newCard = () => ({
  name: "New Card",
  image: "https://cdn.discordapp.com/attachments/954643538342182924/963221684985409546/unknown.png",
  imageSize: "cover",
  type: "ABILITY",
  body: null,
  flavor: null,
  author: null,
  quality: "COMMON",
  fontSize: "10pt",
  edition: null,
  costInExperience: 0,
  darkText: false,
  bodyOpacity: 80,
  prerequisites: {
    "attributePrerequisites": [],
    "skillPrerequisites": [],
    "cardPrerequisites": []
  }
});

const AddCardAutocomplete = ({onChange}) => {
  const cards = useCards();

  const options = cards.map(card => ({label: card.name, id: card.id}));

  return <Autocomplete
    clearOnBlur
    disablePortal
    fullWidth
    handleHomeEndKeys
    selectOnFocus
    options={options}
    sx={{width: 1}}
    renderInput={(params) => <TextField {...params} label={"Add Card Prerequisite"}/>}
    onChange={onChange}
  />;
};

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

  const {openDialog, DeleteDialog} = useDeleteDialog(`Delete card ${card?.name || ""}?`, onDelete);

  const setOpacity = (value) => {
    if (0 < value && value < 1) {
      value *= 100;
    }
    setCard({...card, bodyOpacity: value});
  };

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
    const filteredCardPrerequisites = cardPrerequisites.filter(cp => cp !== cardPrerequisite.id);
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
          onDelete: openDialog
        }}/>
      </TitledAppBar>
      <Container>
        <Box p={4} display="flex" flexDirection="row" justifyContent="space-evenly" flexWrap="wrap">
          <ZoomingToolTip>
            <VisualCard {...card}/>
          </ZoomingToolTip>
          <Card>
            <Box p={4} display="flex" flexDirection="column" width={"20rem"}>

              <Typography variant={"h4"}>
                Appearance
              </Typography>

              <AlcheimTextField
                label={"Name"}
                defaultValue={card.name}
                onChange={event => setCard({...card, name: event.target.value})}
              />

              <AlcheimTextField
                label={"Image URL"}
                defaultValue={card.image}
                onChange={event => setCard({...card, image: event.target.value})}
              />

              <AlcheimTextField
                label={"Image size"}
                defaultValue={card.imageSize}
                onChange={event => setCard({...card, imageSize: event.target.value})}
              />

              <CardQualitySelect value={card.quality} onSelect={quality => setCard({...card, quality})}/>

              <CardTypeSelect value={card.type} onSelect={type => setCard({...card, type})}/>

              <CardEditionSelect value={card.editionId}
                                 onSelect={edition => setCard({...card, editionId: edition.id})}/>

              <AlcheimTextField
                label={"Font Size"}
                defaultValue={card.fontSize}
                onChange={event => setCard({...card, fontSize: event.target.value})}
              />

              <OpacityInput defaultValue={card.bodyOpacity} onChange={setOpacity}/>

              <AlcheimTextField
                label={"Body"}
                multiline
                rows={4}
                defaultValue={card.body}
                onChange={event => setCard({...card, body: event.target.value})}
              />

              <AlcheimTextField
                label={"Flavor"}
                multiline
                rows={2}
                defaultValue={card.flavor}
                onChange={event => setCard({...card, flavor: event.target.value})}
              />

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
          <Card>
            <Box p={4} display="flex" flexDirection="column" width={"20rem"}>
              Prerequisites
              <TextField
                label={"Cost in Experience"}
                type={"number"}
                variant={"outlined"}
                fullWidth margin={"dense"}
                defaultValue={card.costInExperience || 0}
                value={card.costInExperience}
                inputProps={{
                  min: 0,
                  step: 1,
                  readOnly: !isEditing
                }}
                onChange={setCostInExperience}/>
              Attributes
              <List>
              </List>
              Skills
              <List>
              </List>
              Cards
              <List>
                {
                  cardPrerequisites.map(cardPrerequisite =>
                    <ListItem
                      key={cardPrerequisite.id}
                      disablePadding
                      secondaryAction={
                        isEditing && <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => removeCardPrerequisite(cardPrerequisite)}>
                          <DeleteIcon/>
                        </IconButton>
                      }>
                      <ListItemButton>
                        <Link to={`/cards/${cardPrerequisite.id}`} style={{textDecoration: "none"}}>
                          <Tooltip title={<VisualCard {...cardPrerequisite}/>}>
                            <ListItemText>{cardPrerequisite.name}</ListItemText>
                          </Tooltip>
                        </Link>
                      </ListItemButton>
                    </ListItem>
                  )
                }
                {isEditing && <AddCardAutocomplete onChange={(event, value) => {
                  if (!value) {
                    return;
                  }
                  const {prerequisites, ...otherCard} = card;
                  const {cardPrerequisites, ...otherPrerequisites} = prerequisites;
                  const newCard = {
                    ...otherCard,
                    prerequisites: {
                      ...otherPrerequisites,
                      cardPrerequisites: [...cardPrerequisites, value.id]
                    }
                  };
                  setCard(newCard);
                }}/>}
              </List>
            </Box>
          </Card>
        </Box>
      </Container>
      <DeleteDialog/>
    </div>;
};

export default CardDetailsPage;
