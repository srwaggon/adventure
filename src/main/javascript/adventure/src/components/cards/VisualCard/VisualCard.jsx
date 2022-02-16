import "./VisualCard.css";
import FlavorText from "./flavor/FlavorText";
import {D10, D12, D20, D4, D6, D8} from "../../../dice/DiceIcon";
import React from "react";
import {Box, Typography} from "@mui/material";
import {prettify} from "../../../utilities/kitchen_sink";
import {RarityDot} from "./RarityDot";

const VisualCard = ({
  name = "",
  image = "",
  imageSize = "100%",
  type = "",
  body = "",
  flavor = "",
  author = "",
  darkText = false,
  quality = "COMMON",
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

        <div style={{flexGrow: 1}}/>

        <Box className="visual-card-type-row">
          <span className={`visual-card-type${darkTextModifier}`} title={typeText}>{typeText}</span>
          <RarityDot {...{quality}}/>
        </Box>

        <Box className="visual-card-body-box" p={2} mt={1}>
          <Typography variant={"body2"}>
            {body &&
             <div className="visual-card-body-text" title={bodyElements}>
               <span>{bodyElements}</span>
             </div>}
            <FlavorText>{applyTransforms(flavor)}</FlavorText>
          </Typography>
        </Box>

      </Box>
    </Box>
  );
};

const wrapInList = s => [s];

const isString = e => typeof e === "string";

const replaceLineBreaks = (arr) => arr.map(e => isString(e) ? replaceLineBreaksInString(e) : e)
  .flat();
const replaceLineBreaksInString = str => str.split("\n").map(s => [s, <br/>]).flat();

const replaceDiceSymbols = array => {
  const replaceDiceSymbolInArray = (pattern, element) => array => {
    const replaceDiceSymbolInString = str => {
      const result = str.split(pattern).map(s => [s, element]).flat();
      result.pop();
      return result;
    };
    return array.map(e => isString(e) ? replaceDiceSymbolInString(e) : e).flat();
  };
  return [
    replaceDiceSymbolInArray("[d4]", <D4/>),
    replaceDiceSymbolInArray("[d6]", <D6/>),
    replaceDiceSymbolInArray("[d8]", <D8/>),
    replaceDiceSymbolInArray("[d10]", <D10/>),
    replaceDiceSymbolInArray("[d12]", <D12/>),
    replaceDiceSymbolInArray("[d20]", <D20/>),
  ].reduce((acc, f) => f(acc), array);
};

const transformers = [
  wrapInList,
  replaceLineBreaks,
  replaceDiceSymbols,
];

const applyTransforms = value => transformers.reduce((acc, transformer) => transformer(acc), value);

export default VisualCard;
