import {Box} from "@mui/material";
import AlcheimTextField from "../../input/AlcheimTextField";
import OpacityInput from "./OpacityInput";
import React, {useContext} from "react";
import {CardContext} from "./CardContext";
import AlcheimArtToggleButtons from "./AlcheimArtToggleButtons";
import AlcheimTextBrightnessToggle from "./AlcheimTextBrightnessToggle";

export const CardAppearanceForm = () => {

  const [card, setCard] = useContext(CardContext);

  return <Box display="flex" flexDirection="column">

    <AlcheimArtToggleButtons/>

    <AlcheimTextField
      label={"Image URL"}
      defaultValue={card?.appearance?.image}
      onChange={event => setCard(
        {...card, appearance: {...card.appearance, image: event.target.value}})}
    />

    <AlcheimTextField
      label={"Image position"}
      defaultValue={card?.appearance?.imagePosition || "center top"}
      onChange={event => setCard(
        {...card, appearance: {...card.appearance, imagePosition: event.target.value}})}
    />

    <AlcheimTextField
      label={"Image size"}
      defaultValue={card?.appearance?.imageSize || "cover"}
      onChange={event => setCard(
        {...card, appearance: {...card.appearance, imageSize: event.target.value}})}
    />

    <AlcheimTextBrightnessToggle/>

    <OpacityInput/>

    <AlcheimTextField
      label={"Font Size"}
      defaultValue={card?.appearance?.fontSize || "10pt"}
      onChange={event => setCard(
        {...card, appearance: {...card.appearance, fontSize: event.target.value}})}
    />

  </Box>;
};
