import EditButtonRow from "../../buttons/EditButtonRow/EditButtonRow";
import React, {useContext} from "react";
import {CardContext} from "./CardContext";
import useCurrentPlayer from "../../player/UseCurrentPlayer";
import {useCardSaver} from "../card/UseCardSaver";
import {useNavigate} from "react-router-dom";
import {EditingContext} from "./EditingContext";

export const CardDetailsEditButtonRow = (props) => {
  const {openDialog} = props;

  const [card] = useContext(CardContext);
  const [_, setEditing] = useContext(EditingContext);

  const {name: author} = useCurrentPlayer();

  const navigate = useNavigate();

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

  return <EditButtonRow {...{
    onEdit,
    onCancelEdit,
    onCopy,
    onSave,
    onDelete: openDialog(`Delete card ${card?.name || ""}?`)
  }}/>;

};
