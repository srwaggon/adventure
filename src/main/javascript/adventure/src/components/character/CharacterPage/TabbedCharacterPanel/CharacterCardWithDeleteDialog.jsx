import {useDeleteDialog} from "../../../shared/UseDeleteDialog";
import {CharacterCard} from "./CharacterCard";
import React from "react";

export const CharacterCardWithDeleteDialog = (props) => {
  const {card, onDelete, onPlay} = props;
  const {openDialog, DeleteDialog} = useDeleteDialog(() => onDelete(card));
  return <>
    <CharacterCard {...{
      card, onDelete: card.type !== "ACTION" && onDelete ? openDialog(`Really remove ${card.name}?`) : undefined, onPlay
    }} />
    <DeleteDialog/>
  </>;
};
