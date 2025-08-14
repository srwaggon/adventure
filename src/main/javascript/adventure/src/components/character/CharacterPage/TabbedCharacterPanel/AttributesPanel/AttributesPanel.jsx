import React from "react";
import {Divider} from "@mui/material";

import {CharacterAttributesSection} from "./CharacterAttributesSection";
import {CharacterResourcesSection} from "./CharacterResourcesSection";

export const ATTRIBUTES_TAB = "attributes";
export const AttributesPanel = ({character, setCharacter, selectedTab}) => {
  return selectedTab === ATTRIBUTES_TAB && <>
    <CharacterAttributesSection {...{character, setCharacter}}/>

    <Divider/>

    <CharacterResourcesSection {...{character, setCharacter}}/>
  </>;
};
