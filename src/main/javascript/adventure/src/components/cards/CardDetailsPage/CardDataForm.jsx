import {Box} from "@mui/material";
import AlcheimTextField from "../../input/AlcheimTextField";
import CardQualitySelect from "../CardQualitySelect";
import CardTypeSelect from "../CardTypeSelect";
import React, {useContext} from "react";
import {CardContext} from "./CardContext";
import CardEditionSelect from "./CardEditionSelect";

export const CardDataForm = () => {

  const [card, setCard] = useContext(CardContext);

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

      <CardEditionSelect/>

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
