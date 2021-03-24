import './SpecialCard.css';
import FlavorText from '../flavor/FlavorText';
import {D10, D12, D20, D4, D6, D8} from '../../../dice/DiceIcon';
import React from 'react';
import {Box, Typography} from '@material-ui/core';

const SpecialCard = ({name, image, imageSize, type, body, flavor}) => {
  const size = 8;
  const height = size * 3;
  const width = .74 * height;
  const style = {
    backgroundImage: `url(${image})`,
    backgroundSize: imageSize,
    height: `${height}rem`,
    width: `${width}rem`,
  };

  return (
    <Box className="specialcard" p={1} {...{style}}>
      <span className="specialcard-name">{name}</span>
      <div style={{flexGrow: 1}}/>
      <span className="specialcard-type">{type.toLowerCase()}</span>
      <Box className="specialcard-text" p={2} mt={1} border={1}>
        <Typography variant={'body2'}>
          {applyTransforms(body)}
          <FlavorText>{applyTransforms(flavor)}</FlavorText>
        </Typography>
      </Box>
    </Box>
  );
};

const wrapInList = s => [s];

const isString = e => typeof e === 'string';

const replaceLineBreaks = (arr) => arr.map(e => isString(e) ? replaceLineBreaksInString(e) : e).flat();
const replaceLineBreaksInString = str => str.split('\n').map(s => [s, <br/>]).flat();

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
    replaceDiceSymbolInArray('[d4]', <D4/>),
    replaceDiceSymbolInArray('[d6]', <D6/>),
    replaceDiceSymbolInArray('[d8]', <D8/>),
    replaceDiceSymbolInArray('[d10]', <D10/>),
    replaceDiceSymbolInArray('[d12]', <D12/>),
    replaceDiceSymbolInArray('[d20]', <D20/>),
  ].reduce((acc, f) => f(acc), array);
};

const transformers = [
  wrapInList,
  replaceLineBreaks,
  replaceDiceSymbols,
];

const applyTransforms = value => transformers.reduce((acc, transformer) => transformer(acc), value);

export default SpecialCard;