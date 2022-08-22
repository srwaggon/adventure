import React, {useState} from "react";
import {CardContent, Divider, Tab, Tabs} from "@mui/material";
import CenteredGrid from "../../../shared/CenteredGrid";
import {CharacterCardWithDeleteDialog} from "./CharacterCardWithDeleteDialog";

export const FEATURES_TAB = "features";
export const FeaturesPanel = ({cards, onDelete, onPlay, selectedTab}) => {

  const [selectedSubTab, setSelectedSubTab] = useState("all");

  const isFeature = (card) => [
      "CLASS",
      "PASSIVE_ABILITY",
      "PROFICIENCY",
      "TRAIT",
    ].indexOf(card.type)
    > -1;

  const bySubType = (card) =>
    (selectedSubTab === "all") ||
    (selectedSubTab === "classes" && card.type === "CLASS") ||
    (selectedSubTab === "passive abilities" && card.type === "PASSIVE_ABILITY") ||
    (selectedSubTab === "proficiencies" && card.type === "PROFICIENCY") ||
    (selectedSubTab === "traits" && card.type === "TRAIT");

  return selectedTab === FEATURES_TAB && <>
    <Tabs
      value={selectedSubTab}
      onChange={(event, value) => setSelectedSubTab(value)}
    >
      <Tab label="All" value="all"/>
      <Tab label="Classes" value="classes"/>
      <Tab label="Passive Abilities" value="passive abilities"/>
      <Tab label="Proficiencies" value="proficiencies"/>
      <Tab label="Traits" value="traits"/>
    </Tabs>
    <Divider/>
    <CardContent>
      <CenteredGrid>
        {cards
          .filter(isFeature)
          .filter(bySubType)
          .map(card =>
            <CharacterCardWithDeleteDialog
              key={card}
              card={card}
              onDelete={onDelete}
              onPlay={onPlay}
            />)}
      </CenteredGrid>
    </CardContent>
  </>;
};
