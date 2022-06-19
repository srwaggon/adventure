import React from "react";
import {prettify} from "../../../utilities/kitchen_sink";
import {getQualityColor} from "../../../utilities/colors";

export const CardQualityDot = ({quality}) => {

  quality = quality || "COMMON";

  return <span
    className="visual-card-quality-dot"
    style={{backgroundColor: getQualityColor(quality)}}
    title={prettify(quality)}
  />;
};
