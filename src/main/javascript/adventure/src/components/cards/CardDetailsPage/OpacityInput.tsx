import {Box, Grid, InputLabel, Slider} from "@mui/material";
import MuiInput from "@mui/material/Input";
import React, {useContext} from "react";
import {CardContext} from "./CardContext";

const OpacityInput = () => {

  const [card, setCard] = useContext<any>(CardContext);

  const clamp = (value: number) => Math.max(0, value, Math.min(value, 100));

  const setOpacity = (opacity: number) => {
    const bodyOpacity = clamp(opacity);
    setCard({...card, appearance: {...card.appearance, bodyOpacity}});
  };

  const handleSliderChange: any = (event: Event, newValue: number) => {
    setOpacity(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpacity(event.target.value === "" ? 100 : Number(event.target.value));
  };

  const handleBlur = () => {
    setOpacity(card?.appearance?.bodyOpacity);
  };

  return <>
    <Box>
      <InputLabel>Opacity</InputLabel>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            aria-label="Opacity"
            value={card?.appearance.bodyOpacity}
            onChange={handleSliderChange}
            step={10}
            marks
            min={0}
            max={100}
          />
        </Grid>
        <Grid item>
          <MuiInput
            value={clamp(card?.appearance.bodyOpacity)}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 10,
              min: 0,
              max: 100,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  </>;
};

export default OpacityInput;
