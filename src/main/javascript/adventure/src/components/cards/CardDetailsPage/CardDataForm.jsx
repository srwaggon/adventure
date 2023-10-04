import {Box} from "@mui/material";
import AlcheimTextField from "../../input/AlcheimTextField";
import CardQualitySelect from "../CardQualitySelect";
import CardTypeSelect from "../CardTypeSelect";
import CardEditionSelect from "../CardEditionSelect";
import React from "react";

export const CardDataForm = (props) => {
  const {card, setCard} = props;
  return <Box display="flex" flexDirection="column">
    <AlcheimTextField
      label={"Name"}
      defaultValue={card.name}
      onChange={event => setCard({...card, name: event.target.value})}
    />

    <CardQualitySelect
      value={card?.quality || "COMMON"}
      onSelect={quality => setCard(
        {...card, quality})}
    />

    <CardTypeSelect
      value={card?.type || "ABILITY"}
      onSelect={type => setCard({...card, type})}
    />

    <CardEditionSelect
      value={card.editionId || ""}
      onSelect={edition => setCard(
        {...card, editionId: edition.id})}
    />

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
      onChange={event => setCard(
        {...card, flavor: event.target.value})}
    />

  </Box>;
};
