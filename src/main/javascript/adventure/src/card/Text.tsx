import React, {ReactElement} from "react";
import {D10Icon, D12Icon, D20Icon, D4Icon, D6Icon, D8Icon} from "../components/icons/DiceIcons";

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
    replaceDiceSymbolInArray("[d4]", <D4Icon/>),
    replaceDiceSymbolInArray("[d6]", <D6Icon/>),
    replaceDiceSymbolInArray("[d8]", <D8Icon/>),
    replaceDiceSymbolInArray("[d10]", <D10Icon/>),
    replaceDiceSymbolInArray("[d12]", <D12Icon/>),
    replaceDiceSymbolInArray("[d20]", <D20Icon/>),
  ].reduce((acc, f) => f(acc), array);
};

const transformers = () => {
  return [
    wrapInList,
    replaceLineBreaks,
    replaceDiceSymbols,
  ];
};

export const applyTransforms = (value: string | ReactElement) =>
  transformers().reduce((acc, transformer: (a: any) => any) => transformer(acc), value);

