import React, {useContext, useEffect, useState} from "react";
import {CardContext} from "../CardContext";
import {EditingContext} from "../EditingContext";
import {
  Autocomplete,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Tooltip,
  Typography
} from "@mui/material";
import useCards from "../../useCards";
import DeleteIcon from "@mui/icons-material/Delete";
import {Link} from "react-router-dom";
import {VisualCard} from "../../VisualCard/VisualCard";
import {getCardsByIds} from "../../../../utilities/client";

export const PrerequisiteCards = () => {

  const [card, setCard] = useContext(CardContext);

  const [isEditing] = useContext(EditingContext);

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

  return <>
    <Typography variant={"h5"}>Cards</Typography>
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
    <List>
      {cardPrerequisites.map(asListItem(isEditing, removeCardPrerequisite))}
    </List>
  </>;
};

const asListItem = (isEditing, removeCardPrerequisite) =>
  (cardPrerequisite) =>
    <ListItem
      key={cardPrerequisite.id}
      disablePadding
      secondaryAction={
        isEditing && <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => removeCardPrerequisite(
                      cardPrerequisite)}>
                    <DeleteIcon/>
                  </IconButton>
      }>
      <PreviewLink {...{cardPrerequisite}} />
    </ListItem>;

const PreviewLink = ({cardPrerequisite}) => <ListItemButton>
  <Link to={`/cards/${cardPrerequisite.id}`}
        style={{textDecoration: "none"}}>
    <Tooltip
      title={<VisualCard {...cardPrerequisite}/>}>
      <ListItemText>{cardPrerequisite.name}</ListItemText>
    </Tooltip>
  </Link>
</ListItemButton>;

const AddCardAutocomplete = ({onChange}) => {
  const cards = useCards();

  const options = cards.map(card => ({label: card.name, id: card.id}));

  return (
    <Autocomplete
      clearOnBlur
      disablePortal
      fullWidth
      handleHomeEndKeys
      selectOnFocus
      options={options}
      sx={{width: 1}}
      renderInput={(params) => <TextField {...params} label={"Add Card Prerequisite"}/>}
      onChange={onChange}
    />
  );
};
