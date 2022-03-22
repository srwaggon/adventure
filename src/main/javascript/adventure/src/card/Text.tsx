import React, {ReactElement} from "react";

import {D10, D12, D20, D4, D6, D8} from "../dice/DiceIcon";

const wrapInList = (s: string) => [s];

const isString = (e: any) => typeof e === "string";

const replaceLineBreaks = (arr: ReactElement[]) => arr.map((e: any) => isString(e) ? replaceLineBreaksInString(e) : e)
  .flat();
const replaceLineBreaksInString = (str: string) => str.split("\n").map(s => [s, <br/>]).flat();

const replaceDiceSymbols = (array: ReactElement[]) => {
  const replaceDiceSymbolInArray = (pattern: string, element: ReactElement) => (array: ReactElement[]) => {
    const replaceDiceSymbolInString = (str: string) => {
      const result = str.split(pattern).map(s => [s, element]).flat();
      result.pop();
      return result;
    };
    return array.map((e: any) => isString(e) ? replaceDiceSymbolInString(e) : e).flat();
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

export const applyTransforms = (value: string | ReactElement) =>
  transformers.reduce((acc, transformer: (a: any) => any) => transformer(acc), value);

