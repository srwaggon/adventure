import {findSubPropertyWithName} from "../../../../../property";
import {Box, Button, IconButton} from "@mui/material";
import {AddBox, Backspace} from "@mui/icons-material";
import {Row} from "../../../../Row/Row";
import {D10Icon} from "../../../../icons/DiceIcons";
import {DotArray} from "./DotArray";
import React from "react";

export const Attribute = (props) => {
  const {
    attribute,
    isEditing,
    name,
    setValue,
    value,
  } = props;

  if (attribute === undefined) {
    return undefined;
  }

  const ReduceButton = isEditing && value > findSubPropertyWithName("minimum")(
    attribute).value && <IconButton
                         checked={false}
                         color={"primary"}
                         size={"small"}
                         style={{marginLeft: "-4px", padding: 0}}
                         onClick={() => setValue(value - 1)}
                       ><Backspace/></IconButton>;

  const IncreaseButton = isEditing && value < findSubPropertyWithName("maximum")(
    attribute).value && <IconButton
                           checked={false}
                           color={"primary"}
                           size={"small"}
                           style={{margin: "-2px", padding: 0}}
                           fullWidth={true}
                           onClick={() => setValue(value + 1)}
                         ><AddBox/></IconButton>;

  return attribute ?
         <Row className="character-attribute">
           <Box flexGrow={1}>
             <Button fullWidth={true} startIcon={<D10Icon/>}>
               <Box width={"100%"} style={{textTransform: "capitalize", textAlign: "left"}}>
                 {name}
               </Box>
             </Button>
           </Box>
           <Box width={"105px"}>
             <Box>
               <DotArray {...{name: name, value: value}} />

               {ReduceButton}

               {IncreaseButton}
             </Box>
           </Box>
         </Row>
                   : undefined;
};
