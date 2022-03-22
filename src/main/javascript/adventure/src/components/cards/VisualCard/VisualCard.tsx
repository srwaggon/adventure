import "./VisualCard.css";
import FlavorText from "./flavor/FlavorText";

import React from "react";
import {Box, Typography} from "@mui/material";
import {prettify} from "../../../utilities/kitchen_sink";
import {RarityDot} from "./RarityDot";
import {applyTransforms} from "../../../card/Text";

export const VisualCard = ({
  name = "",
  image = "",
  imageSize = "100%",
  type = "",
  body = "",
  flavor = "",
  author = "",
  darkText = false,
  quality = "COMMON",
  fontSize = "10pt",
  bodyOpacity = 1.0,
}) => {
  const size = 22.5;
  const height = size;
  const width = .74 * size;
  const backgroundStyles = image && image !== "" ? {
    backgroundImage: `url(${image})`,
    backgroundSize: imageSize
  } : {};
  const contentStyle = {
    ...backgroundStyles,
    height: `${height}rem`,
    width: `${width}rem`,
  };

  const darkTextModifier = darkText ? " darkText" : "";

  const typeText = prettify(type);
  const bodyElements = applyTransforms(body);
  return (
    <Box className="visualcard">
      <Box className="visual-card-content" p={1} {...{style: contentStyle}}>

        <span className={`visual-card-name${darkTextModifier}`} title={name}>{name}</span>
        <span className={`visual-card-type${darkTextModifier}`} title={typeText}>{typeText}</span>

        <div style={{flexGrow: 1}}/>

        <Box className="visual-card-type-row">
          <RarityDot {...{quality}}/>
        </Box>

        {(body || flavor) && <Box className="visual-card-body-box" p={1} mt={1} style={{opacity: bodyOpacity}}>
          <Typography variant={"body2"}>
            {body &&
            <div className="visual-card-body-text" title={body} style={{fontSize}}>
              <span>{bodyElements}</span>
            </div>}
            {flavor && <FlavorText>{flavor}</FlavorText>}
          </Typography>
        </Box>}

      </Box>
    </Box>
  );
};
