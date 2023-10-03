import DeleteIcon from "@mui/icons-material/Delete";
import {
    Autocomplete,
    Box,
    Card,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    TextField,
    Tooltip
} from "@mui/material";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import AlcheimTextField from "../../input/AlcheimTextField";
import useCards from "../useCards";
import {VisualCard} from "../VisualCard/VisualCard";

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

const getPrerequisiteCards = (cardPrerequisites, isEditing, removeCardPrerequisite, card,
                              setCard) => <>
    <h2>
        Cards
    </h2>
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
                                                            onClick={() => removeCardPrerequisite(
                                                                cardPrerequisite)}>
                                                            <DeleteIcon/>
                                                        </IconButton>
                                          }>
                                          <ListItemButton>
                                              <Link to={`/cards/${cardPrerequisite.id}`}
                                                    style={{textDecoration: "none"}}>
                                                  <Tooltip
                                                      title={<VisualCard {...cardPrerequisite}/>}>
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
</>;

const PrerequisiteSkills = () => {
    const [prerequisites, setPrerequisites] = useState([]);

    const addPrerequisite = (str) => setPrerequisites([...prerequisites, str]);

    return <>
        <h2>
            Skills
        </h2>
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

const getPrerequisiteAttributes = () => <>
    <h2>
        Attributes
    </h2>
    <List>
    </List>
</>;

const Prerequisites = (props) => {
    const {cardPrerequisites, isEditing, removeCardPrerequisite, card, setCard} = props;
    return <>
        <h1>Prerequisites</h1>
        {getPrerequisiteAttributes()}

        <PrerequisiteSkills/>

        {getPrerequisiteCards(cardPrerequisites, isEditing, removeCardPrerequisite, card, setCard)}
    </>;
};

const getExperienceCosts = (card, isEditing, setCostInExperience) => <>
    <h2>Experience</h2>
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
</>;

const getCosts = (card, isEditing, setCostInExperience) => <>
    <h1>Costs</h1>
    {getExperienceCosts(card, isEditing, setCostInExperience)}
</>;

const PrerequisitesAndCosts = ({
                                   cardPrerequisites,
                                   isEditing,
                                   removeCardPrerequisite,
                                   card,
                                   setCard,
                                   setCostInExperience
                               }) => {
    return <Card>
        <Box p={4} display="flex" flexDirection="column" width={"20rem"}>
            {<Prerequisites {...{
                cardPrerequisites,
                isEditing,
                removeCardPrerequisite,
                card,
                setCard
            }}/>}

            {getCosts(card, isEditing, setCostInExperience)}
        </Box>
    </Card>;
};

export default PrerequisitesAndCosts;
