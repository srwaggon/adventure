import React from "react";
import {prettify} from "../../../utilities/kitchen_sink";
import {getQualityColor} from "../../../utilities/colors";
import {Box} from "@mui/material";

export const CardQualityDot = ({quality}) => {

  quality = quality || "COMMON";

  return <Box width={10} height={10}>
    <span
      className="visual-card-quality-dot"
      style={{backgroundColor: getQualityColor(quality)}}
      title={prettify(quality)}
    />
  </Box>;
};
