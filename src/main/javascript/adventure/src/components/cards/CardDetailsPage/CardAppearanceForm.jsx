import {Box} from "@mui/material";
import AlcheimTextField from "../../input/AlcheimTextField";
import OpacityInput from "./OpacityInput";
import React, {useContext} from "react";
import {CardContext} from "./CardContext";
import AlcheimArtToggleButtons from "./AlcheimArtToggleButtons";
import AlcheimTextBrightnessToggle from "./AlcheimTextBrightnessToggle";

export const CardAppearanceForm = () => {

  const [card, setCard] = useContext(CardContext);

  const setOpacity = (value) => {
    if (0 < value && value < 1) {
      value *= 100;
    }
    setCard({...card, bodyOpacity: value});
  };

  return <Box display="flex" flexDirection="column">

    <AlcheimArtToggleButtons/>

    <AlcheimTextField
      label={"Image URL"}
      defaultValue={card.image}
      onChange={event => setCard({...card, image: event.target.value})}
    />

    <AlcheimTextField
      label={"Image position"}
      defaultValue={card?.imagePosition || "center top"}
      onChange={event => setCard(
        {...card, imagePosition: event.target.value})}
    />

    <AlcheimTextField
      label={"Image size"}
      defaultValue={card?.imageSize || "cover"}
      onChange={event => setCard(
        {...card, imageSize: event.target.value})}
    />

    <AlcheimTextBrightnessToggle/>

    <OpacityInput defaultValue={card?.bodyOpacity || "80"} onChange={setOpacity}/>

    <AlcheimTextField
      label={"Font Size"}
      defaultValue={card?.fontSize || "10pt"}
      onChange={event => setCard(
        {...card, fontSize: event.target.value})}
    />

  </Box>;
};
