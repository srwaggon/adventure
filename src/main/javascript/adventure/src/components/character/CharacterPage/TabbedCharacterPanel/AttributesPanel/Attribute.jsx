import {findSubPropertyWithName} from "../../../../../property";
import {Box, Button, IconButton} from "@mui/material";
import {AddBox, Backspace} from "@mui/icons-material";
import {D10Icon} from "../../../../icons/DiceIcons";
import {DotArray} from "./DotArray";
import React from "react";
import {Column} from "../../../../Column/Column";

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
         <Column className="character-attribute">
           <Box style={{
             border: "solid thin grey",
             borderRadius: "4px",
             margin: "2px",
             width: "120px",
           }}>
             <Button
               fullWidth={true}
               startIcon={<D10Icon/>}
               style={{
                 textTransform: "capitalize",
                 width: "100%"
               }}
             >
               {name}
             </Button>
             <Box
               flexGrow={1}
               style={{
                 justifyItems: "center",
                 padding: "6px 8px",
               }}
             >
               <DotArray {...{name: name, value: value}} />
               {ReduceButton}
               {IncreaseButton}
             </Box>
           </Box>
         </Column>
                   : undefined;
};
