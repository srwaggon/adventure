import React, {useState} from "react";

import {Box, Divider, Tab, Tabs} from "@mui/material";
import {SPELLS_TAB, SpellsPanel} from "./SpellsPanel";
import {INVENTORY_TAB, InventoryPanel} from "./InventoryPanel";
import {FEATURES_TAB, FeaturesPanel} from "./FeaturesPanel";
import {ACTIONS_TAB, ActionsPanel} from "./ActionsPanel";
import {SKILLS_TAB, SkillsPanel} from "./SkillsPanel/SkillsPanel";
import {ATTRIBUTES_TAB, AttributesPanel} from "./AttributesPanel/AttributesPanel";

export const TabbedCharacterPanels = ({
  character,
  setCharacter,
  isEditing,
  cards,
  setCards,
  onPlay = () => {
  }
}) => {

  const onDelete = (card) => setCards(cards.filter(c => c.id !== card.id));

  const [selectedTab, setSelectedTab] = useState(ATTRIBUTES_TAB);

  return <>
    <Tabs
      value={selectedTab}
      onChange={(event, value) => setSelectedTab(value)}
      scrollButtons="auto"
    >
      <Tab label="💪 Attributes" value={ATTRIBUTES_TAB}/>
      <Tab label="📚 Skills" value={SKILLS_TAB}/>
      <Tab label="⚔️ Actions" value={ACTIONS_TAB}/>
      <Tab label="🔍 Features" value={FEATURES_TAB}/>
      <Tab label="📦 Inventory" value={INVENTORY_TAB}/>
      <Tab label="✨ Spells" value={SPELLS_TAB}/>
    </Tabs>

    <Divider/>

    <Box minHeight={"476px"}>
      <AttributesPanel {...{character, setCharacter, isEditing, selectedTab}}/>
      <SkillsPanel {...{isEditing, selectedTab}} />
      <ActionsPanel {...{cards, isEditing, onDelete, onPlay, selectedTab}}/>
      <FeaturesPanel {...{cards, isEditing, onDelete, onPlay, selectedTab}}/>
      <InventoryPanel {...{cards, isEditing, onDelete, onPlay, selectedTab}}/>
      <SpellsPanel {...{cards, isEditing, onDelete, onPlay, selectedTab}}/>
    </Box>
  </>;
};

export default TabbedCharacterPanels;
