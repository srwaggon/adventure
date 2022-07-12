import {Box, Divider, Typography} from "@mui/material";
import React, {ReactElement} from "react";
import {applyTransforms} from "../../../card/Text";
import {DARK_MODE_BLACK, getQualityColor, LIGHT_MODE_WHITE} from "../../../utilities/colors";
import {prettify} from "../../../utilities/kitchen_sink";
import {CardQualityDot} from "./CardQualityDot";
import {FlavorText} from "./FlavorText";
import "./VisualCard.css";

const getClampedBodyOpacity = (bodyOpacity: number) => {
  if (bodyOpacity > 100) {
    bodyOpacity %= 100;
  }
  if (bodyOpacity > 1) {
    bodyOpacity /= 100;
  }
  return bodyOpacity;
};

const getOpacityHex = (bodyOpacity: number) => {
  const result = Math.floor(getClampedBodyOpacity(bodyOpacity) * 255).toString(16);
  return result === "0" ? "00" : result;
};

type VisualCardProps = {
  name?: string,
  image?: string,
  imageSize?: string,
  type?: string,
  body?: string,
  flavor?: string,
  author?: string,
  darkText?: boolean,
  quality?: string,
  bodyOpacity?: number,
  fontSize?: string,
}

export const VisualCard = (props: VisualCardProps): ReactElement => {

  const {
    name = "",
    image = "",
    imageSize = "cover",
    type = "",
    body = "",
    flavor = "",
    author = "",
    darkText = false,
    quality = null,
    bodyOpacity = 80,
    fontSize = "10pt",
  } = props;

  const height = 22.5;
  const width = height * .74;
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

  const titleColor = quality && quality !== "COMMON"
    ? getQualityColor(quality)
    : darkText
      ? LIGHT_MODE_WHITE
      : DARK_MODE_BLACK;

  const typeText = prettify(type);
  const bodyElements = applyTransforms(body);
  const backgroundColor = (darkText ? DARK_MODE_BLACK : LIGHT_MODE_WHITE) + getOpacityHex(bodyOpacity);

  return (
    <Box className="visualcard">
      <Box className="visual-card-content" p={1} {...{style: contentStyle}}>
        <div style={{flexGrow: 1}}/>

        <Box
          className={`visual-card-text-box ${darkTextModifier}`}
          p={0.5}
          style={{
            backgroundColor: backgroundColor,
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >

          <Box className="flex-center-space-between" color={titleColor}>
              <span
                className={"visual-card-name"}
                style={{
                  textTransform: "capitalize",
                  fontWeight: "bold",
                }}
                title={name}
              >
                {name}
              </span>
            {quality && <CardQualityDot quality={quality}/>}
          </Box>

          <Box className="flex-center-space-between">
            <span
              className={"visual-card-type"}
              style={{
                fontSize: "10pt",
                fontWeight: 500,
                textTransform: "capitalize",
              }}
              title={typeText}
            >
              {typeText}
            </span>
          </Box>

          {(body || flavor) && <Box>
            <Box mt={"0.25rem"} mb={"0.25rem"}><Divider/></Box>

            <Typography variant={"body2"} sx={{lineHeight: 1.2}}>
              {body && <div className="visual-card-body-text" title={body} style={{fontSize}}>
                <span>{bodyElements}</span>
              </div>}

              {(body && flavor) && <Box mt={"0.5rem"}/>}

              {flavor && <FlavorText fontSize={fontSize}>{flavor}</FlavorText>}
            </Typography>
          </Box>}

        </Box>
      </Box>
    </Box>
  );
};
