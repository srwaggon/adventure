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

const ALL_TAB = "all";
const ACTIONS_TAB = "actions";
const ABILITIES_TAB = "abilities";
const EQUIPMENT_TAB = "equipment";
const INVENTORY_TAB = "inventory";
const RESOURCES_TAB = "resources";
const SPELLS_TAB = "spells";

const AllCardsPanel = ({cards, isEditing, onDelete, onPlay, selectedTab}) => {
  return selectedTab === ALL_TAB && <>
    <CardContent>
      <CenteredGrid>
        {cards.map(card =>
          <CharacterCard {...{card, isEditing, onDelete, onPlay}} />)}
      </CenteredGrid>
    </CardContent>
  </>;
};

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
  const [selectedSubTab, setSelectedSubTab] = useState("all");
  const isAbility = (card) => [
      "ABILITY",
      "CLASS",
      "FEAT",
      "PASSIVE_ABILITY",
      "PROFICIENCY",
      "REACTION",
      "TRAIT",
      "WHIM"
    ].indexOf(card.type)
    > -1;
  const bySubType = (card) =>
    (selectedSubTab === "all") ||
    (selectedSubTab === "abilities" && card.type === "ABILITY") ||
    (selectedSubTab === "feats" && card.type === "FEAT") ||
    (selectedSubTab === "passive abilities" && (card.type === "CLASS" || card.type === "PASSIVE_ABILITY")) ||
    (selectedSubTab === "proficiencies" && card.type === "PROFICIENCY") ||
    (selectedSubTab === "reactions" && card.type === "REACTION") ||
    (selectedSubTab === "traits" && card.type === "TRAIT") ||
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
        <Tab label="Proficiencies" value="proficiencies"/>
        <Tab label="Reactions" value="reactions"/>
        <Tab label="Traits" value="traits"/>
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
  const isEquipment = (card) => ["ARMOR", "EQUIPMENT", "TOOL", "WEAPON"].indexOf(card.type) > -1;
  const [selectedSubTab, setSelectedSubTab] = useState("all");
  const bySubType = (card) =>
    (selectedSubTab === "all") ||
    (selectedSubTab === "equipped" && card.type === "ABILITY") ||
    (selectedSubTab === "unequipped" && card.type === "ABILITY") ||
    (selectedSubTab === "armors" && card.type === "ARMOR") ||
    (selectedSubTab === "tools" && card.type === "TOOL") ||
    (selectedSubTab === "weapons" && card.type === "WEAPON");
  return selectedTab === EQUIPMENT_TAB && <>
    <Toolbar>
      <Tabs
        value={selectedSubTab}
        onChange={(event, value) => setSelectedSubTab(value)}
      >
        <Tab label="All" value="all"/>
        <Tab label="Equipped" value="equipped"/>
        <Tab label="Unequipped" value="unequipped"/>
        <Tab label="Armors" value="armors"/>
        <Tab label="Tools" value="tools"/>
        <Tab label="Weapons" value="weapons"/>
      </Tabs>
    </Toolbar>
    <Divider/>
    <CardContent>
      <CenteredGrid>
        {cards
          .filter(isEquipment)
          .filter(bySubType)
          .map(card => <CharacterCard {...{card, isEditing, onDelete, onPlay}} />)}
      </CenteredGrid>
    </CardContent>
  </>;
};

const InventoryTabPanel = ({cards, isEditing, onDelete, onPlay, selectedTab}) => {
  const isItem = (card) => ["ITEM", "CONSUMABLE", "CURRENCY", "TREASURE"].indexOf(card.type) > -1;
  const [selectedSubTab, setSelectedSubTab] = useState("all");
  const bySubType = (card) =>
    (selectedSubTab === "all") ||
    (selectedSubTab === "consumables" && card.type === "CONSUMABLE") ||
    (selectedSubTab === "currencies" && card.type === "CURRENCY") ||
    (selectedSubTab === "treasures" && card.type === "TREASURE") ||
    (selectedSubTab === "other" && card.type === "ITEM");
  return selectedTab === INVENTORY_TAB && <>
    <Toolbar>
      <Tabs
        value={selectedSubTab}
        onChange={(event, value) => setSelectedSubTab(value)}
      >
        <Tab label="All" value="all"/>
        <Tab label="Consumables" value="consumables"/>
        <Tab label="Currencies" value="currencies"/>
        <Tab label="Treasures" value="treasures"/>
        <Tab label="Other" value="other"/>
      </Tabs>
    </Toolbar>
    <CardContent>
      <CenteredGrid>
        {cards
          .filter(isItem)
          .filter(bySubType)
          .map(card =>
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
    <Toolbar>
      <Tabs
        value={selectedSubTab}
        onChange={(event, value) => setSelectedSubTab(value)}
      >
        <Tab label="All" value="all"/>
        <Tab label="Spells" value="spells"/>
        <Tab label="Cantrips" value="cantrips"/>
        <Tab label="Curses" value="curses"/>
        <Tab label="Enchantments" value="enchantments"/>
        <Tab label="Components" value="components"/>
      </Tabs>
    </Toolbar>
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

  const [selectedTab, setSelectedTab] = useState(ALL_TAB);

  return <Card>
    <Toolbar>
      <Tabs
        value={selectedTab}
        onChange={(event, value) => setSelectedTab(value)}
      >
        <Tab label="📚 All" value={ALL_TAB}/>
        <Tab label="🦶 Actions" value={ACTIONS_TAB}/>
        <Tab label="💪 Abilities" value={ABILITIES_TAB}/>
        <Tab label="⚔️ Equipment" value={EQUIPMENT_TAB}/>
        <Tab label="📦 Inventory" value={INVENTORY_TAB}/>
        <Tab label="🔨 Resources" value={RESOURCES_TAB}/>
        <Tab label="✨ Spells" value={SPELLS_TAB}/>
      </Tabs>
      <Box flexGrow={1}/>
      <AddButton/>
    </Toolbar>
    <Divider/>

    <Box minHeight={"476px"}>
      <AllCardsPanel {...{cards, isEditing, onDelete, onPlay, selectedTab}}/>
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
