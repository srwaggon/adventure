import {AddBox, Backspace} from "@mui/icons-material";

import {Box, Button, IconButton} from "@mui/material";
import React from "react";

import {D10Icon} from "../../../../icons/DiceIcons";
import {Row} from "../../../../Row/Row";
import {DotArray} from "./DotArray";

type CharacterAttributeParams = {
  name: string;
  value: number;
  minimum: number;
  maximum: number;
  isEditing: boolean;
  setValue: (value: number) => void;
};

export const CharacterAttribute = (props: CharacterAttributeParams) => {
  const {name, isEditing, value, setValue, minimum, maximum} = props;

  // @ts-ignore
  const ReduceButton = isEditing && value > minimum && <IconButton
    checked={false}
    color={"primary"}
    size={"small"}
    style={{marginLeft: "-4px", padding: 0}}
    onClick={() => setValue(value - 1)}
  ><Backspace/></IconButton>;

  // @ts-ignore
  const IncreaseButton = isEditing && value < maximum && <IconButton
    checked={false}
    color={"primary"}
    size={"small"}
    style={{margin: "-2px", padding: 0}}
    fullWidth={true}
    onClick={() => setValue(value + 1)}
  ><AddBox/></IconButton>;

  return (
    <Row className="character-attribute">
      <Box flexGrow={1}>
        <Button fullWidth={true} startIcon={<D10Icon/>}>
          <Box width={"100%"} style={{textTransform: "capitalize", textAlign: "left"}}>
            {name}
          </Box>
        </Button>
      </Box>
      <Box width={"105px"}>

        <DotArray {...{name: name, value: value}} />

        {ReduceButton}

        {IncreaseButton}

      </Box>
    </Row>
  );
};
