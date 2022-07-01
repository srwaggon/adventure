import React, {useState} from "react";
import {CardContent, Divider, Tab, Tabs} from "@mui/material";
import CenteredGrid from "../../../shared/CenteredGrid";
import {CharacterCard} from "./CharacterCard";

export const INVENTORY_TAB = "inventory";
export const InventoryPanel = ({cards, onDelete, onPlay, selectedTab}) => {
  const isItem = (card) => ["ARMOR", "CONSUMABLE", "CURRENCY", "EQUIPMENT", "ITEM", "RESOURCE", "TOOL", "TREASURE",
    "WEAPON"].indexOf(card.type) > -1;
  const [selectedSubTab, setSelectedSubTab] = useState("all");
  const bySubType = (card) =>
    (selectedSubTab === "all") ||
    (selectedSubTab === "consumables" && card.type === "CONSUMABLE") ||
    (selectedSubTab === "currencies" && card.type === "CURRENCY") ||
    (selectedSubTab === "equipment" && (["ARMOR", "EQUIPMENT", "TOOL", "WEAPON"].indexOf(card.type) > -1)) ||
    (selectedSubTab === "items" && card.type === "ITEM") ||
    (selectedSubTab === "resources" && card.type === "RESOURCE") ||
    (selectedSubTab === "treasures" && card.type === "TREASURE")
  ;
  return selectedTab === INVENTORY_TAB && <>
    <Tabs
      value={selectedSubTab}
      onChange={(event, value) => setSelectedSubTab(value)}
      scrollButtons="auto"
    >
      <Tab label="All" value="all"/>
      <Tab label="Consumables" value="consumables"/>
      <Tab label="Currencies" value="currencies"/>
      <Tab label="Equipment" value="equipment"/>
      <Tab label="Items" value="items"/>
      <Tab label="Resources" value="resources"/>
      <Tab label="Treasures" value="treasures"/>
    </Tabs>
    <Divider/>
    <CardContent>
      <CenteredGrid>
        {cards
          .filter(isItem)
          .filter(bySubType)
          .map(card =>
            <CharacterCard {...{card, onDelete, onPlay}} />)}
      </CenteredGrid>
    </CardContent>
  </>;
};
