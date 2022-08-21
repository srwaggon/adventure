import {Box, Grid, Slider, Typography} from "@mui/material";
import MuiInput from "@mui/material/Input";
import {styled} from "@mui/styles";
import React from "react";

type propsType = { defaultValue: number, onChange: (value: number | number[]) => void }

// @ts-ignore
const Input = styled(MuiInput)`
  width: 42px;
`;

const OpacityInput = ({defaultValue, onChange}: propsType) => {
  const [value, setValue] = React.useState<number | string | Array<number | string>>(
    defaultValue * (0 < defaultValue && defaultValue <= 1 ? 100 : 1));

  const setOpacity = (opacity: number | number[]) => {
    setValue(opacity);
    onChange(opacity);
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setOpacity(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpacity(event.target.value === "" ? 100 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setOpacity(0);
    } else if (value > 100) {
      setOpacity(100);
    }
  };

  return <>
    <Box>
      <Typography id="input-slider" gutterBottom>
        Opacity
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            aria-label="Opacity"
            value={typeof value === "number" ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            step={10}
            marks
            min={0}
            max={100}
          />
        </Grid>
        <Grid item>
          <Input
            value={value}
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
