import React, {useState} from "react";

import {Badge, Box, Card, CardContent, Divider, Tab, Tabs, Toolbar} from "@mui/material";
import DeleteButton from "../../buttons/DeleteButton";
import {VisualCard} from "../../cards/VisualCard/VisualCard.tsx";
import {Link} from "react-router-dom";
import PlayButton from "../../buttons/PlayButton";
import SendButton from "../../buttons/SendButton";
import BrokenImageButton from "../../buttons/BrokenImageButton";
import AddButton from "../../buttons/AddButton";
import CenteredGrid from "../../shared/CenteredGrid";
import useCards from "../../cards/useCards";

const ACTIONS_TAB = "actions";
const ABILITIES_TAB = "abilities";
const EQUIPMENT_TAB = "equipment";
const INVENTORY_TAB = "inventory";
const RESOURCES_TAB = "resources";
const SPELLS_TAB = "spells";

const ActionsPanel = ({isEditing, onDelete, onPlay, selectedTab}) => {
  const cards = useCards().filter(card => card.type === "ACTION");
  return selectedTab === ACTIONS_TAB && <>
    <CardContent>
      <CenteredGrid>
        {cards.map(card =>
          <CharacterCard {...{card, isEditing, onDelete, onPlay}} />)}
      </CenteredGrid>
    </CardContent>
  </>;
};

const AbilitiesTabPanel = ({cards, isEditing, onDelete, onPlay, selectedTab}) => {
  const [selectedSubTab, setSelectedSubTab] = useState("abilities");
  const isAbility = (card) => ["ABILITY", "CLASS", "FEAT", "PASSIVE_ABILITY", "REACTION", "WHIM"].indexOf(card.type)
    > -1;
  const bySubType = (card) =>
    (selectedSubTab === "all") ||
    (selectedSubTab === "abilities" && card.type === "ABILITY") ||
    (selectedSubTab === "feats" && card.type === "FEAT") ||
    (selectedSubTab === "passive abilities" && (card.type === "CLASS" || card.type === "PASSIVE_ABILITY")) ||
    (selectedSubTab === "reactions" && card.type === "REACTION") ||
    (selectedSubTab === "whims" && card.type === "WHIM");
  return selectedTab === ABILITIES_TAB && <>
    <Toolbar>
      <Tabs
        value={selectedSubTab}
        onChange={(event, value) => setSelectedSubTab(value)}
      >
        <Tab label="All" value="all"/>
        <Tab label="Abilities" value="abilities"/>
        <Tab label="Feats" value="feats"/>
        <Tab label="Passive Abilities" value="passive abilities"/>
        <Tab label="Reactions" value="reactions"/>
        <Tab label="Whims" value="whims"/>
      </Tabs>
    </Toolbar>
    <Divider/>
    <CardContent>
      <CenteredGrid>
        {cards
          .filter(isAbility)
          .filter(bySubType)
          .map(card =>
            <CharacterCard {...{card, isEditing, onDelete, onPlay}} />)}
      </CenteredGrid>
    </CardContent>
  </>;
};

const EquipmentTabPanel = ({cards, isEditing, onDelete, onPlay, selectedTab}) => {
  const [selectedSubTab, setSelectedSubTab] = useState("equipment_all");
  const isEquipment = (card) => ["EQUIPMENT"].indexOf(card.type) > -1;
  return selectedTab === EQUIPMENT_TAB && <>
    <Toolbar>
      <Tabs
        value={selectedSubTab}
        onChange={(event, value) => setSelectedSubTab(value)}
      >
        <Tab label="All" value="equipment_all"/>
        <Tab label="Equipped" value="equipment_equipped"/>
        <Tab label="Unequipped" value="equipment_unequipped"/>
      </Tabs>
    </Toolbar>
    <Divider/>
    <CardContent>
      <CenteredGrid>
        {cards.filter(isEquipment).map(card => <CharacterCard {...{card, isEditing, onDelete, onPlay}} />)}
      </CenteredGrid>
    </CardContent>
  </>;
};

const InventoryTabPanel = ({cards, isEditing, onDelete, onPlay, selectedTab}) => {
  const [selectedSubTab, setSelectedSubTab] = useState("items_all");
  const isItem = (card) => ["ITEM"].indexOf(card.type) > -1;
  return selectedTab === INVENTORY_TAB && <>
    <Toolbar>
      <Tabs
        value={selectedSubTab}
        onChange={(event, value) => setSelectedSubTab(value)}
      >
        <Tab label="All" value="items_all"/>
        <Tab label="Consumables" value="items_consumables"/>
        <Tab label="Tools" value="items_tools"/>
        <Tab label="Other" value="items_other"/>
      </Tabs>
    </Toolbar>
    <CardContent>
      <CenteredGrid>
        {cards.filter(isItem).map(card =>
          <CharacterCard {...{card, isEditing, onDelete, onPlay}} />)}
      </CenteredGrid>
    </CardContent>
  </>;
};

const ResourcesTabPanel = ({cards, isEditing, onDelete, onPlay, selectedTab}) => {
  const isResource = (card) => ["RESOURCE"].indexOf(card.type) > -1;
  return selectedTab === RESOURCES_TAB && <>
    <CardContent>
      <CenteredGrid>
        {cards.filter(isResource).map(card =>
          <CharacterCard {...{card, isEditing, onDelete, onPlay}} />)}
      </CenteredGrid>
    </CardContent>
  </>;
};

const SpellsTabPanel = ({cards, isEditing, onDelete, onPlay, selectedTab}) => {
  const isAbility = (card) => ["SPELLS"].indexOf(card.type) > -1;
  return selectedTab === SPELLS_TAB && <>
    <CardContent>
      <CenteredGrid>
        {cards.filter(isAbility).map(card =>
          <CharacterCard {...{card, isEditing, onDelete, onPlay}} />)}
      </CenteredGrid>
    </CardContent>
  </>;
};

const CharacterCard = ({card, isEditing, removeCardFromCharacter, onPlay}) =>
  <Card>
    <Link to={`/cards/${card.id}`} style={{textDecoration: "none"}}>
      <VisualCard {...card}/>
    </Link>
    <Box display="flex" flexDirection="row">
      <DeleteButton disabled={!isEditing} onClick={() => removeCardFromCharacter(card)}/>
      <Badge badgeContent={4} color="secondary" overlap="circular">
        <BrokenImageButton/>
      </Badge>
      <PlayButton onClick={() => onPlay(card)}/>
      <SendButton/>
    </Box>
  </Card>;

const CharacterCards = ({
  isEditing, cards, setCards, onPlay = () => {
  }
}) => {

  const onDelete = (card) => setCards(cards.filter(c => c.id !== card.id));

  const [selectedTab, setSelectedTab] = useState("actions");

  return <Card>
    <Toolbar>
      <Tabs
        value={selectedTab}
        onChange={(event, value) => setSelectedTab(value)}
      >
        <Tab label="🦶 Actions" value={ACTIONS_TAB}/>
        <Tab label="💪 Abilities" value={ABILITIES_TAB}/>
        <Tab label="⚔️ Equipment" value={EQUIPMENT_TAB}/>
        <Tab label="📦 Inventory" value={INVENTORY_TAB}/>
        <Tab label="✨ Resources" value={RESOURCES_TAB}/>
        <Tab label="⚡ Spells" value={SPELLS_TAB}/>
      </Tabs>
      <Box flexGrow={1}/>
      <AddButton/>
    </Toolbar>
    <Divider/>

    <Box minHeight={"476px"}>
      <ActionsPanel {...{isEditing, onDelete, onPlay, selectedTab}}/>
      <AbilitiesTabPanel {...{cards, isEditing, onDelete, onPlay, selectedTab}}/>
      <EquipmentTabPanel {...{cards, isEditing, onDelete, onPlay, selectedTab}}/>
      <InventoryTabPanel {...{cards, isEditing, onDelete, onPlay, selectedTab}}/>
      <ResourcesTabPanel {...{cards, isEditing, onDelete, onPlay, selectedTab}}/>
      <SpellsTabPanel {...{cards, isEditing, onDelete, onPlay, selectedTab}}/>
    </Box>
  </Card>;
};

export default CharacterCards;
