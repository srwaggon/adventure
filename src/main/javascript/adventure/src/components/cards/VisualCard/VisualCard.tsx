import {Box, Divider, Typography} from "@mui/material";
import React, {ReactElement} from "react";
import {applyTransforms} from "../../../card/Text";
import {
  DARK_MODE_BLACK,
  getQualityColor,
  LIGHT_MODE_WHITE,
  NEUTRAL_MODE_GREY
} from "../../../utilities/colors";
import {prettify} from "../../../utilities/kitchen_sink";
import {CardQualityDot} from "./CardQualityDot";
import {FlavorText} from "./FlavorText";
import "./VisualCard.css";

import {Card} from "../../../card/Cards";

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

  type?: string,
  body?: string,
  flavor?: string,
  author?: string,
  quality?: string,

  appearance: {
    fullArt?: boolean

    image?: string,
    imageSize?: string,
    imagePosition?: string,

    darkText?: boolean,
    fontSize?: string,
    bodyOpacity?: number,
  }
}

const DEFAULT_OPACITY = 80;

const DEFAULT_FONT_SIZE = "10pt";

const LEATHER_BACKGROUND = "https://media.istockphoto.com/photos/old-book-cover-picture-id922784228?k=20&m=922784228&s=612x612&w=0&h=NOOwTDKNBUuFCWWW2DFNdr48Uen2mK1FJ_E4AMZhGCo=";
export const VisualCard = (props: VisualCardProps): ReactElement => {

  const card = new Card(props);
  const appearance = card.getAppearance();
  const cardImage = appearance.getImage();

  const height = 22.5;
  const width = height * .74;
  const backgroundStyles = {
    backgroundImage: `url(${appearance.isFullArt() && cardImage && cardImage !== "" ? cardImage : LEATHER_BACKGROUND})`,
    backgroundSize: appearance.isFullArt() ? appearance.getImageSize() : "100%",
    backgroundPosition: appearance.isFullArt() ? appearance.getImagePosition() : "none",
  };
  const contentStyle = {
    ...backgroundStyles,
    height: `${height}rem`,
    width: `${width}rem`,
  };

  const darkTextModifier = appearance.isDarkText() ? "dark-mode" : "light-mode";

  const titleColor = card.getQuality() && !card.isCommon()
    ? getQualityColor(card.getQuality())
    : appearance.isDarkText()
      ? LIGHT_MODE_WHITE
      : DARK_MODE_BLACK;

  const typeText = prettify(card.getType() || "ABILITY");
  const bodyElements = applyTransforms(card.getBody() || "");

  const backgroundColor = (appearance.isDarkText() ? DARK_MODE_BLACK : LIGHT_MODE_WHITE) + getOpacityHex(!appearance.isFullArt() ? 100 : appearance.getBodyOpacity() || DEFAULT_OPACITY);

  const CardPane = (props: any) => {
    const {children, className, style, ...otherProps} = props;
    return <Box
      className={`visual-card-pane ${className}`}
      p={0.5}
      style={{
        backgroundColor,
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
        {!appearance.isFullArt() && <CardPane
          height={180}
          flexGrow={1}
          style={{
            backgroundImage: `url(${appearance.getImage()})`,
            backgroundSize: "cover",
            backgroundPosition: appearance.getImagePosition(),
            borderColor: DARK_MODE_BLACK,
          }}/>}

        <Box flexGrow={appearance.isFullArt() ? 1 : 0} minHeight={10}/>

        <CardPane className={`visual-card-text-box ${darkTextModifier}`}>

          <Box className="flex-center-space-between" color={titleColor}>
            <span
              className={"visual-card-name"}
              style={{
                textTransform: "capitalize",
                fontWeight: "bold",
              }}
              title={card.getName()}
            >
              {card.getName()}
            </span>
            {card.getQuality() && <CardQualityDot quality={card.getQuality()}/>}
          </Box>

          <Box className="flex-center-space-between">
            <span
              className={"visual-card-type"}
              style={{
                fontSize: DEFAULT_FONT_SIZE,
                fontWeight: 500,
                textTransform: "capitalize",
              }}
              title={typeText}
            >
              {typeText}
            </span>
          </Box>

          {(card.getBody() || card.getFlavor()) && <Box>
            <Box mt={"0.25rem"} mb={"0.25rem"}><Divider/></Box>

            <Typography variant={"body2"} sx={{lineHeight: 1.2}}>
              {card.getBody() && <div className="visual-card-body-text" title={card.getBody()}
                                      style={{fontSize: appearance.getFontSize()}}>
                <span>{bodyElements}</span>
              </div>}

              {(card.getBody() && card.getFlavor()) && <Box mt={"0.5rem"}/>}

              {card.getFlavor() &&
                <FlavorText fontSize={appearance.getFontSize()}>{card.getFlavor()}</FlavorText>}
            </Typography>
          </Box>}

        </CardPane>
      </Box>
    </Box>
  );
};
