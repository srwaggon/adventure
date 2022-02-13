import Colors from "../../../utilities/colors";
import React from "react";
import {prettify} from "../../../utilities/kitchen_sink";

export const RarityDot = ({quality}) => {

  quality = quality || "COMMON";

  const getRarityColor = quality => {
    const qualityToColourMap = {
      "POOR": Colors.GREY,
      "COMMON": Colors.WHITE,
      "UNCOMMON": Colors.GREEN,
      "RARE": Colors.BLUE,
      "EPIC": Colors.PURPLE,
      "LEGENDARY": Colors.ORANGE,
      "ARTIFACT": Colors.LIGHT_GOLD,
      "UNIQUE": Colors.RED,
    };

    return qualityToColourMap[quality.toUpperCase()] || Colors.WHITE;
  };

  return <span
    className="visual-card-rarity-dot"
    style={{backgroundColor: getRarityColor(quality)}}
    title={prettify(quality)}
  />;
};