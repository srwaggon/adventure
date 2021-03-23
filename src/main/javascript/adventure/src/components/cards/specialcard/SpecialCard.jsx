import './SpecialCard.css';
import FlavorText from '../flavor/FlavorText';
import {D10, D12, D20, D4, D6, D8} from '../../../dice/DiceIcon';
import React from 'react';
import {Card} from '@material-ui/core';

const SpecialCard = ({name, image, imageSize, type, body, flavor}) => {
  const style = {
    backgroundImage: `url(${image})`,
    backgroundSize: imageSize,
  };

  return (
    <Card className="specialcard" {...{style}}>
      <div className="specialcard-name">{name}</div>
      <div className="specialcard-image" />
      <div className="specialcard-type">{type.toLowerCase()}</div>
      <div className="specialcard-body">
        {applyTransforms(body)}
        <FlavorText>{applyTransforms(flavor)}</FlavorText>
      </div>
    </Card>
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