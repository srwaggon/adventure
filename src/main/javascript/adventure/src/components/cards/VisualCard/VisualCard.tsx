import "./VisualCard.css";
import FlavorText from "./flavor/FlavorText";

import React from "react";
import {Box, Divider, Typography} from "@mui/material";
import {prettify} from "../../../utilities/kitchen_sink";
import {CardQualityDot} from "./CardQualityDot";
import {applyTransforms} from "../../../card/Text";
import {DARK_MODE_BLACK, getQualityColor, LIGHT_MODE_WHITE} from "../../../utilities/colors";

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

  const darkTextModifier = darkText ? "dark-mode" : "light-mode";

  const titleColor = quality !== "COMMON"
    ? getQualityColor(quality)
    : darkText
      ? LIGHT_MODE_WHITE
      : DARK_MODE_BLACK;

  const typeText = prettify(type);
  const bodyElements = applyTransforms(body);
  const backgroundColor = (darkText ? DARK_MODE_BLACK : LIGHT_MODE_WHITE) + Math.floor(bodyOpacity * 255).toString(16);

  return (
    <Box className="visualcard">
      <Box className="visual-card-content" p={1} {...{style: contentStyle}}>
        <div style={{flexGrow: 1}}/>

        <Box className={`visual-card-text-box ${darkTextModifier}`} style={{backgroundColor: backgroundColor}}>

          <Box className="flex-center-space-between" color={titleColor}>
            <span className={"visual-card-name"} title={name}>{name}</span>
            <CardQualityDot {...{quality}}/>
          </Box>

          <Box className="flex-center-space-between">
            <span className={"visual-card-type"} title={typeText}>{typeText}</span>
          </Box>

          {(body || flavor) && <Box>
            <Box mt={"0.25rem"} mb={"0.25rem"}><Divider/></Box>

            <Typography variant={"body2"}>
              {body && <div className="visual-card-body-text" title={body} style={{fontSize}}>
                <span>{bodyElements}</span>
              </div>}

              {(body && flavor) && <Box mt={"1em"}/>}

              {flavor && <FlavorText>{flavor}</FlavorText>}
            </Typography>
          </Box>}

        </Box>
      </Box>
    </Box>
  );
};
