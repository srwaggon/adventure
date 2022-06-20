import {Box, Button, IconButton} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import FiberManualRecordOutlinedIcon from "@mui/icons-material/FiberManualRecordOutlined";
import {AddBox, Backspace} from "@mui/icons-material";
import React from "react";
import {D10Icon} from "../icons/DiceIcons";

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
    <Box className="character-attribute" alignItems={"center"} width={260} display="flex">
      <Button startIcon={<D10Icon/>}>
        <Box width={80} style={{textTransform: "capitalize", textAlign: "left"}}>
          {attribute}
        </Box>
      </Button>
      <div className="character-attribute-value">

        <DotArray {...{key: attribute, value}} />

        {isEditing && value > 1 && <IconButton
          checked={false}
          color={"primary"}
          size={"small"}
          style={{margin: "-4px"}}
          onClick={reduceValue}
        ><Backspace/></IconButton>}

        {isEditing && <IconButton
          checked={false}
          color={"primary"}
          size={"small"}
          style={{margin: "-4px"}}
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
      key={`${name}-${int}`}
      color={"default"}
      size={"small"}
      style={{margin: "-4px"}}
    >
      {int < value
        ? <FiberManualRecordIcon/>
        : <FiberManualRecordOutlinedIcon/>}
    </IconButton>
  );

export default CharacterAttribute;
