import React, {useState} from "react";
import {Box, Divider, Typography} from "@mui/material";
import {CharacterResource} from "./CharacterResource";
import {CharacterAttribute} from "./CharacterAttribute";

import "./AttributesPanel.css"
import EditButtonRow from "../../../../buttons/EditButtonRow/EditButtonRow";
import {Row} from "../../../../Row/Row";
import {replaceCharacter} from "../../../../../utilities/client";

export const ATTRIBUTES_TAB = "attributes";
export const AttributesPanel = ({character, setCharacter, selectedTab}) => {
  return selectedTab === ATTRIBUTES_TAB && <>
    <CharacterAttributesSection {...{character, setCharacter}}/>

    <Divider/>

    <CharacterResourcesSection {...{character, setCharacter}}/>
  </>;
};

const copyCharacterValue = characterValue => ({...characterValue});

const copyCharacterAttributes = ({
  strength, dexterity, constitution,
  presence, influence, composure,
  intelligence, wits, resolve
}) => {
  return {
    strength: copyCharacterValue(strength),
    dexterity: copyCharacterValue(dexterity),
    constitution: copyCharacterValue(constitution),
    presence: copyCharacterValue(presence),
    influence: copyCharacterValue(influence),
    composure: copyCharacterValue(composure),
    intelligence: copyCharacterValue(intelligence),
    wits: copyCharacterValue(wits),
    resolve: copyCharacterValue(resolve)
  };
};

const CharacterAttributesSection = ({character, setCharacter}) => {

  const [attributes, setAttributes] = useState(copyCharacterAttributes(character));

  const [isEditing, setIsEditing] = useState(false);

  const CharacterAttributeWrapper = ({attribute}) => {

    const setAttributeValue = (attribute) => {
      return (value) => {
        attribute.value = value;
        const newAttributes = {...attributes};
        newAttributes[attribute.name] = attribute;
        setAttributes(newAttributes);
      }
    }

    return <CharacterAttribute
      isEditing={isEditing}
      valueName={attribute.name}
      characterValue={attribute}
      setValue={setAttributeValue(attribute)}
    />;
  }

  const onEdit = () => {
    setIsEditing(true);
  };

  const onCancelEdit = () => {
    setIsEditing(false);
    setAttributes(copyCharacterAttributes(character));
  };

  const onSave = () => {
    setIsEditing(false);
    replaceCharacter({...character, ...attributes})
      .then(response => response.json())
      .then(character => {
        setCharacter(character);
      });
  };

  return <Box p={1}>
    <Row>
      <Typography variant="h5">Attributes</Typography>
      <EditButtonRow
        onEdit={onEdit}
        onCancelEdit={onCancelEdit}
        onSave={onSave}
      />
    </Row>
    <ul className={"character-attributes-list"}>
      <li><CharacterAttributeWrapper attribute={attributes.strength}/></li>
      <li><CharacterAttributeWrapper attribute={attributes.dexterity}/></li>
      <li><CharacterAttributeWrapper attribute={attributes.constitution}/></li>
      <li><CharacterAttributeWrapper attribute={attributes.presence}/></li>
      <li><CharacterAttributeWrapper attribute={attributes.influence}/></li>
      <li><CharacterAttributeWrapper attribute={attributes.composure}/></li>
      <li><CharacterAttributeWrapper attribute={attributes.intelligence}/></li>
      <li><CharacterAttributeWrapper attribute={attributes.wits}/></li>
      <li><CharacterAttributeWrapper attribute={attributes.resolve}/></li>
    </ul>
  </Box>;
}

const copyResources = ({health, stamina, confidence, reputation, mana, focus}) => {
  return {
    health: copyCharacterValue(health),
    stamina: copyCharacterValue(stamina),
    confidence: copyCharacterValue(confidence),
    reputation: copyCharacterValue(reputation),
    mana: copyCharacterValue(mana),
    focus: copyCharacterValue(focus),
  }
};

const CharacterResourcesSection = ({character, setCharacter}) => {
  const [resources, setResources] = useState(copyResources(character));

  const [isEditing, setIsEditing] = useState(false);

  const onSave = () => {
    setIsEditing(false);
    replaceCharacter({...character, ...resources})
      .then(response => response.json())
      .then(character => {
        setCharacter(character);
      });
  };

  const onCancelEdit = () => {
    setIsEditing(false);
    setResources(copyResources(character))
  };

  return <Box p={1}>
    <Row>
      <Typography variant="h5">Resources</Typography>
      <EditButtonRow
        onEdit={() => setIsEditing(true)}
        onCancelEdit={onCancelEdit}
        onSave={onSave}
      />
    </Row>
    <ul className={"character-attributes-list"}>
      <li><CharacterResource {...{character, setCharacter, isEditing}} resource={resources.health}/></li>
      <li><CharacterResource {...{character, setCharacter, isEditing}} resource={resources.stamina}/></li>
      <li><CharacterResource {...{character, setCharacter, isEditing}} resource={resources.reputation}/></li>
      <li><CharacterResource {...{character, setCharacter, isEditing}} resource={resources.confidence}/></li>
      <li><CharacterResource {...{character, setCharacter, isEditing}} resource={resources.mana}/></li>
      <li><CharacterResource {...{character, setCharacter, isEditing}} resource={resources.focus}/></li>
    </ul>
  </Box>;
}
