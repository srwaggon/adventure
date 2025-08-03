import React, {useState} from "react";
import {Box, Divider, Typography} from "@mui/material";
import {CharacterResource} from "./CharacterResource";

import "./AttributesPanel.css";
import EditButtonRow from "../../../../buttons/EditButtonRow/EditButtonRow";
import {Row} from "../../../../Row/Row";
import {replaceCharacter} from "../../../../../utilities/client";
import {
  copyCharacterProperties,
  isAttributeWithName,
  isNamed,
  updateValue
} from "../../../../../property";
import {arrayRemove} from "../../../../../utilities/arrays";
import {Attribute} from "./Attribute";

export const ATTRIBUTES_TAB = "attributes";
export const AttributesPanel = ({character, setCharacter, selectedTab}) => {
  return selectedTab === ATTRIBUTES_TAB && <>
    <CharacterAttributesSection {...{character, setCharacter}}/>

    <Divider/>

    <CharacterResourcesSection {...{character, setCharacter}}/>
  </>;
};

const copyCharacterValue = characterValue => ({...characterValue});

const CharacterAttributesSection = ({character, setCharacter}) => {

  const [properties, setProperties] = useState(copyCharacterProperties(character));

  const [isEditing, setIsEditing] = useState(false);

  const AttributeWrapper = ({attribute}) => {

    if (attribute === undefined) {
      return undefined;
    }

    const setAttributeValue = (attribute) => {
      return (value) => {
        const oldAttributeProperty = properties.find(isNamed(attribute.name));
        const newProperties = arrayRemove(properties, oldAttributeProperty);
        newProperties.push(updateValue(attribute, value));
        setProperties([...newProperties]);
      };
    };

    return <Attribute
      attribute={attribute}
      isEditing={isEditing}
      name={attribute.name}
      value={properties.find(isNamed(attribute.name)).value}
      setValue={setAttributeValue(attribute)}
    />;
  };

  const onEdit = () => {
    setIsEditing(true);
  };

  const onCancelEdit = () => {
    setIsEditing(false);
    setProperties(copyCharacterProperties(character));
  };

  const onSave = () => {
    setIsEditing(false);
    const updatedCharacter = {...character, properties: properties};
    replaceCharacter(updatedCharacter)
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
      <li>
        <AttributeWrapper attribute={character.properties.find(isAttributeWithName('strength'))}/>
      </li>
      <li>
        <AttributeWrapper attribute={character.properties.find(isAttributeWithName('agility'))}/>
      </li>
      <li>
        <AttributeWrapper
          attribute={character.properties.find(isAttributeWithName('endurance'))}/></li>
      <li>
        <AttributeWrapper
          attribute={character.properties.find(isAttributeWithName('intelligence'))}/></li>
      <li>
        <AttributeWrapper attribute={character.properties.find(isAttributeWithName('wisdom'))}/>
      </li>
      <li>
        <AttributeWrapper attribute={character.properties.find(isAttributeWithName('charisma'))}/>
      </li>
      <li>
        <AttributeWrapper attribute={character.properties.find(isAttributeWithName('luck'))}/>
      </li>
    </ul>
  </Box>;
};

const copyResources = ({health, stamina, confidence, reputation, mana, focus}) => {
  return {
    health: copyCharacterValue(health),
    stamina: copyCharacterValue(stamina),
    confidence: copyCharacterValue(confidence),
    reputation: copyCharacterValue(reputation),
    mana: copyCharacterValue(mana),
    focus: copyCharacterValue(focus),
  };
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
    setResources(copyResources(character));
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
      <li>
        <CharacterResource {...{character, setCharacter, isEditing}} resource={resources.health}/>
      </li>
      <li>
        <CharacterResource {...{character, setCharacter, isEditing}}
                           resource={resources.stamina}/></li>
      <li>
        <CharacterResource {...{character, setCharacter, isEditing}}
                           resource={resources.reputation}/></li>
      <li>
        <CharacterResource {...{character, setCharacter, isEditing}}
                           resource={resources.confidence}/></li>
      <li>
        <CharacterResource {...{character, setCharacter, isEditing}} resource={resources.mana}/>
      </li>
      <li>
        <CharacterResource {...{character, setCharacter, isEditing}} resource={resources.focus}/>
      </li>
    </ul>
  </Box>;
};
