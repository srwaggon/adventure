import {Box, FormControlLabel, Switch} from "@mui/material";
import AlcheimTextField from "../../input/AlcheimTextField";
import OpacityInput from "./OpacityInput";
import React from "react";

export const CardAppearanceForm = (props) => {
  const {card, setCard} = props;

  const setOpacity = (value) => {
    if (0 < value && value < 1) {
      value *= 100;
    }
    setCard({...card, bodyOpacity: value});
  };

  return <Box display="flex" flexDirection="column">

    <FormControlLabel
      label="Full Art"
      control={
        <Switch
          checked={card?.fullArt || false}
          onChange={event => setCard(
            {...card, fullArt: event.target.checked})}
          color="primary"
          inputProps={{"aria-label": "primary checkbox"}}
        />
      }
    />

    <AlcheimTextField
      label={"Image URL"}
      defaultValue={card.image}
      onChange={event => setCard({...card, image: event.target.value})}
    />

    <AlcheimTextField
      label={"Image size"}
      defaultValue={card?.imageSize || "cover"}
      onChange={event => setCard(
        {...card, imageSize: event.target.value})}
    />

    <AlcheimTextField
      label={"Image position"}
      defaultValue={card?.imagePosition || "center top"}
      onChange={event => setCard(
        {...card, imagePosition: event.target.value})}
    />

    <FormControlLabel
      label="Dark Text"
      control={
        <Switch
          checked={card?.darkText || false}
          onChange={event => setCard(
            {...card, darkText: event.target.checked})}
          color="primary"
          inputProps={{"aria-label": "primary checkbox"}}
        />
      }
    />

    <OpacityInput defaultValue={card?.bodyOpacity || "80"}
                  onChange={setOpacity}/>

    <AlcheimTextField
      label={"Font Size"}
      defaultValue={card?.fontSize || "10pt"}
      onChange={event => setCard(
        {...card, fontSize: event.target.value})}
    />

  </Box>;
};
