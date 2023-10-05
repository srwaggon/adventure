import DeleteIcon from "@mui/icons-material/Delete";
import {
  Autocomplete,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Tooltip,
  Typography
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import AlcheimTextField from "../../input/AlcheimTextField";
import useCards from "../useCards";
import {VisualCard} from "../VisualCard/VisualCard";
import {getCardsByIds} from "../../../utilities/client";

const PrerequisitesForm = (props) => {
  const {
    isEditing,
    card,
    setCard
  } = props;

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

  return <Box display="flex" flexDirection="column">
    <Typography variant={"h5"}>Attributes</Typography>

    <PrerequisiteSkills/>

    <PrerequisiteCards {...{
      card,
      setCard,
      isEditing,
      cardPrerequisites,
      removeCardPrerequisite
    }}/>
  </Box>
    ;
};

const PrerequisiteSkills = () => {
  const [prerequisites, setPrerequisites] = useState([]);

  const addPrerequisite = (str) => setPrerequisites([...prerequisites, str]);

  return <>
    <Typography variant={"h5"}>Skills</Typography>
    <List>
      {prerequisites.map((e, index) => {
        return <li key={`li-${e}-${index}`}>
          {e}
        </li>;
      })}
    </List>
    <AlcheimTextField
      label={"Skill prerequisite"}
      defaultValue={""}
      onKeyDown={event => {
        if (event.key === "Enter") {
          event.preventDefault();
          addPrerequisite(event.target.value);
        }
      }}
    />
  </>;
};

const PrerequisiteCards = (props) => {

    const {card, setCard, isEditing, cardPrerequisites, removeCardPrerequisite} = props;

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
  }
;

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

export default PrerequisitesForm;
