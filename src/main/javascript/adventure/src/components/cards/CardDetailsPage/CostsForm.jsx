import {Box, TextField, Typography} from "@mui/material";
import React from "react";

export const CostsForm = ({card, setCard, isEditing}) => {

    const setCostInExperience = event => {
      const costInExperienceCost = event.target.value;
      const costInExperienceValue = parseInt(costInExperienceCost);
      const costInExperience = Math.max(0, costInExperienceValue);
      setCard({...card, costInExperience});
    };

    return <Box display={"flex"} flexDirection={"column"}>
      <Typography variant={"h5"}>Experience</Typography>

      <TextField
        label={"Cost in Experience"}
        type={"number"}
        variant={"outlined"}
        fullWidth
        margin={"dense"}
        defaultValue={card.costInExperience || 0}
        value={card.costInExperience}
        inputProps={{
          min: 0,
          step: 1,
          readOnly: !isEditing
        }}
        onChange={setCostInExperience}/>
    </Box>;
  }
;
