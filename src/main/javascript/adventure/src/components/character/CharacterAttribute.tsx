import React from "react";

import {Box, Button, IconButton} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import FiberManualRecordOutlinedIcon from "@mui/icons-material/FiberManualRecordOutlined";
import {AddBox, Backspace} from "@mui/icons-material";

import {D10Icon} from "../icons/DiceIcons";

import "./CharacterAttribute.css";

type CharacterValue = { name: string, value: number, minimum: number, maximum: number };

type CharacterAttributeParams = { valueName: string; isEditing: boolean; characterValue: CharacterValue; setValue: (value: number) => void; };

const CharacterAttribute = (props: CharacterAttributeParams) => {
  const {valueName, isEditing, characterValue, setValue} = props;

  const increaseValue = () => {
    setValue(characterValue.value + 1);
  };

  const reduceValue = () => {
    setValue(characterValue.value - 1);
  };

  // @ts-ignore
  const ReduceButton = isEditing && characterValue.value > characterValue.minimum && <IconButton
    checked={false}
    color={"primary"}
    size={"small"}
    style={{marginLeft: "-4px", padding: 0}}
    onClick={reduceValue}
  ><Backspace/></IconButton>;

  // @ts-ignore
  const IncreaseButton = isEditing && characterValue.value < characterValue.maximum && <IconButton
    checked={false}
    color={"primary"}
    size={"small"}
    style={{margin: "-2px", padding: 0}}
    fullWidth={true}
    onClick={increaseValue}
  ><AddBox/></IconButton>;

  return (
    <Box className="character-attribute"
         alignItems={"center"}
         width={260}
         display="flex"
         justifyContent="space-between">
      <Button startIcon={<D10Icon/>}>
        <Box width={120} style={{textTransform: "capitalize", textAlign: "left"}}>
          {valueName}
        </Box>
      </Button>
      <div className="character-attribute-value">

        <DotArray {...{name: valueName, value: characterValue.value}} />

        {ReduceButton}

        {IncreaseButton}

      </div>
    </Box>
  );
};

const DotArray = (props: any) => {
  const {name, value} = props;
  const dottedDots = Math.max(5, value);
  const oneEach: any = Array(dottedDots).keys();
  return <>
    {[...oneEach]
      .map((int) =>
        <IconButton
          key={`dot-${name}-${int}`}
          color={"default"}
          size={"small"}
          style={{margin: "-2px", padding: 0}}
        >
          {int < value
            ? <FiberManualRecordIcon/>
            : <FiberManualRecordOutlinedIcon/>}
        </IconButton>
      )}
  </>;
};

export default CharacterAttribute;
