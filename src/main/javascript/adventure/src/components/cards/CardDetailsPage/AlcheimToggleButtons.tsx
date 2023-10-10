import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

type Value = any;

type AlcheimToggleButtonsProps = {
  value: Value,
  buttons: ButtonData[],
  onChange: (value: Value) => void,
}

const AlcheimToggleButtons = (props: AlcheimToggleButtonsProps) =>
  <ToggleButtonGroup
    value={props.value}
    exclusive
    onChange={(event: any) => props.onChange(event.target.value)}
    aria-label="text alignment"
  >
    {props.buttons.map(toToggleButton)}
  </ToggleButtonGroup>

type ButtonData = {
  name: string,
  value: Value
};

const newButtonData = (name: string, value: Value): ButtonData => ({name, value})

const newButtonsData = (names: string[]) =>
  names.map((name, index) =>
    newButtonData(name, index));

const toToggleButton = ({name, value}: ButtonData) =>
  <ToggleButton
    key={`toggle-button-${name}-${value}`}
    value={value}>
    {name}
  </ToggleButton>;

export {
  newButtonData,
  newButtonsData
};

export default AlcheimToggleButtons;
