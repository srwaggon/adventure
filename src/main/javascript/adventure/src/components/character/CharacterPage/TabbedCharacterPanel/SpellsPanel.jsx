import React, {useState} from "react";

import {CardContent, Divider, Tab, Tabs} from "@mui/material";
import CenteredGrid from "../../../shared/CenteredGrid";
import {CharacterCard} from "./CharacterCard";

export const SPELLS_TAB = "spells";
export const SpellsPanel = ({cards, isEditing, onDelete, onPlay, selectedTab}) => {
  const isSpell = (card) => ["SPELL", "CANTRIP", "CURSE", "ENCHANTMENT", "SPELL_COMPONENT"].indexOf(card.type) > -1;
  const [selectedSubTab, setSelectedSubTab] = useState("all");
  const bySubType = (card) =>
    (selectedSubTab === "all") ||
    (selectedSubTab === "spells" && card.type === "SPELL") ||
    (selectedSubTab === "cantrips" && card.type === "CANTRIP") ||
    (selectedSubTab === "curses" && card.type === "CURSE") ||
    (selectedSubTab === "enchantments" && card.type === "ENCHANTMENT") ||
    (selectedSubTab === "components" && card.type === "SPELL_COMPONENT");
  return selectedTab === SPELLS_TAB && <>
    <Tabs
      value={selectedSubTab}
      onChange={(event, value) => setSelectedSubTab(value)}
      scrollButtons="auto"
    >
      <Tab label="All" value="all"/>
      <Tab label="Cantrips" value="cantrips"/>
      <Tab label="Curses" value="curses"/>
      <Tab label="Components" value="components"/>
      <Tab label="Enchantments" value="enchantments"/>
      <Tab label="Spells" value="spells"/>
    </Tabs>
    <Divider/>
    <CardContent>
      <CenteredGrid>
        {cards
          .filter(isSpell)
          .filter(bySubType)
          .map(card =>
            <CharacterCard {...{card, isEditing, onDelete, onPlay}} />)}
      </CenteredGrid>
    </CardContent>
  </>;
};
