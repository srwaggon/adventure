import {Box, Divider, Typography} from "@mui/material";
import React, {ReactElement} from "react";
import {applyTransforms} from "../../../card/Text";
import {DARK_MODE_BLACK, getQualityColor, LIGHT_MODE_WHITE, NEUTRAL_MODE_GREY} from "../../../utilities/colors";
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
  fullArt?: boolean
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
    fullArt = true,
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
  const backgroundStyles = {
    backgroundImage: `url(${fullArt && image && image !== "" ? image
      : "https://media.istockphoto.com/photos/old-book-cover-picture-id922784228?k=20&m=922784228&s=612x612&w=0&h=NOOwTDKNBUuFCWWW2DFNdr48Uen2mK1FJ_E4AMZhGCo="})`,
    backgroundSize: fullArt ? imageSize : "100%"
  };
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

  const CardPane = (props: any) => {
    const {children, className, style, ...otherProps} = props;
    return <Box
      className={`visual-card-pane ${className}`}
      p={0.5}
      style={{
        backgroundColor: backgroundColor,
        border: `solid thin ${NEUTRAL_MODE_GREY}`,
        borderRadius: "4px",
        overflow: "hidden",
        ...style
      }}
      {...otherProps}
    >
      {children}
    </Box>;
  };

  return (
    <Box className="visualcard">
      <Box className="visual-card-content" p={1} {...{style: contentStyle}}>
        {!fullArt && <CardPane
          height={180}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            borderColor: DARK_MODE_BLACK,
          }}/>}

        <Box flexGrow={fullArt ? 1 : 0} minHeight={10}/>

        <CardPane
          flexGrow={fullArt ? 0 : 1}
          className={`visual-card-text-box ${darkTextModifier}`}
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

        </CardPane>
      </Box>
    </Box>
  );
};
