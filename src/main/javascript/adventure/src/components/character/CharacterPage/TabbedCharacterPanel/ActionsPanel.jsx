import React, {useState} from "react";
import useCards from "../../../cards/useCards";
import {CardContent, Divider, Tab, Tabs} from "@mui/material";
import CenteredGrid from "../../../shared/CenteredGrid";
import {CharacterCardWithDeleteDialog} from "./CharacterCardWithDeleteDialog";
import {byName} from "../../../../card/Cards";

export const ACTIONS_TAB = "actions";
export const ActionsPanel = ({cards, onDelete, onPlay, selectedTab}) => {

  const [selectedSubTab, setSelectedSubTab] = useState("all");

  const actionCards = useCards().filter(card => card.type === "ACTION");

  const isAction = (card) => [
      "ABILITY",
      "ACTION",
      "ATTACK",
      "FEAT",
      "REACTION",
      "WHIM"
    ].indexOf(card.type)
    > -1;

  const bySubType = (card) =>
    (selectedSubTab === "all") ||
    (selectedSubTab === "abilities" && card.type === "ABILITY") ||
    (selectedSubTab === "attacks" && card.type === "ATTACK") ||
    (selectedSubTab === "feats" && card.type === "FEAT") ||
    (selectedSubTab === "reactions" && card.type === "REACTION") ||
    (selectedSubTab === "whims" && card.type === "WHIM");

  const cardsToDisplay = selectedSubTab === "actions"
    ? actionCards
    : [...actionCards, ...cards].sort(byName).filter(isAction).filter(bySubType);

  return selectedTab === ACTIONS_TAB && <>
    <Tabs
      value={selectedSubTab}
      onChange={(event, value) => setSelectedSubTab(value)}
      scrollButtons="auto"
    >
      <Tab label="All" value="all"/>
      <Tab label="Actions" value="actions"/>
      <Tab label="Abilities" value="abilities"/>
      <Tab label="Attacks" value="attacks"/>
      <Tab label="Feats" value="feats"/>
      <Tab label="Reactions" value="reactions"/>
      <Tab label="Whims" value="whims"/>
    </Tabs>
    <Divider/>
    <CardContent>
      <CenteredGrid>
        {cardsToDisplay.map(
          card =>
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
