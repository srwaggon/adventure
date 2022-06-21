import React from "react";

import {Box, Button, IconButton} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import FiberManualRecordOutlinedIcon from "@mui/icons-material/FiberManualRecordOutlined";
import {AddBox, Backspace} from "@mui/icons-material";

import {D10Icon} from "../icons/DiceIcons";

import "./CharacterAttribute.css";

const CharacterAttribute = (props) => {
  const {character, setCharacter, attribute, isEditing} = props;

  const value = character && character[attribute] && character[attribute].value ? character[attribute].value : 0

  const increaseValue = () => {
    character[attribute].value += 1;
    setCharacter({...character});
  };

  const reduceValue = () => {
    character[attribute].value -= 1;
    setCharacter({...character});
  };

  return (
    <Box className="character-attribute"
         alignItems={"center"}
         width={260}
         display="flex"
         justifyContent="space-between">
      <Button startIcon={<D10Icon/>}>
        <Box width={120} style={{textTransform: "capitalize", textAlign: "left"}}>
          {attribute}
        </Box>
      </Button>
      <div className="character-attribute-value">

        <DotArray {...{key: attribute, value}} />

        {isEditing && value > 1 && <IconButton
          checked={false}
          color={"primary"}
          size={"small"}
          style={{marginLeft: "-4px", padding: 0}}
          onClick={reduceValue}
        ><Backspace/></IconButton>}

        {isEditing && <IconButton
          checked={false}
          color={"primary"}
          size={"small"}
          style={{margin: "-2px", padding: 0}}
          fullWidth={true}
          onClick={increaseValue}
        ><AddBox/></IconButton>}

      </div>
    </Box>
  );
};

const DotArray = ({name, value}) =>
  [...Array(Math.max(5, value)).keys()].map((int) =>
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
  );

export default CharacterAttribute;
