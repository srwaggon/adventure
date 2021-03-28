package com.github.srwaggon.adventure.character;

import com.google.common.collect.Lists;

import com.github.srwaggon.adventure.util.Identified;

import java.util.List;
import java.util.UUID;

public class PlayerCharacter implements Identified<UUID> {

  private UUID id = UUID.randomUUID();
  private String name = "New Character";
  private String portraitUrl;
  private final CharacterValue strength = new CharacterValue(1, 5, 1);
  private final CharacterValue dexterity = new CharacterValue(1, 5, 1);
  private final CharacterValue constitution = new CharacterValue(1, 5, 1);
  private final CharacterValue presence = new CharacterValue(1, 5, 1);
  private final CharacterValue influence = new CharacterValue(1, 5, 1);
  private final CharacterValue composure = new CharacterValue(1, 5, 1);
  private final CharacterValue intelligence = new CharacterValue(1, 5, 1);
  private final CharacterValue wits = new CharacterValue(1, 5, 1);
  private final CharacterValue resolve = new CharacterValue(1, 5, 1);

  private final CharacterValue stamina = new CharacterValue(0, 2, 1);
  private final CharacterValue reputation = new CharacterValue(0, 10, 10);
  private final CharacterValue focus = new CharacterValue(0, 2, 1);

  private final CharacterValue health = new CharacterValue(0, 10, 10);
  private final CharacterValue confidence = new CharacterValue(0, 2, 1);
  private final CharacterValue mana = new CharacterValue(0, 10, 10);

  private final List<String> cards = Lists.newArrayList();

  private final List<String> proficiencies = Lists.newArrayList();

  public PlayerCharacter() {
  }

  @Override
  public UUID getId() {
    return id;
  }

  @Override
  public void setId(UUID uuid) {
    this.id = uuid;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getPortraitUrl() {
    return portraitUrl;
  }

  public void setPortraitUrl(String portraitUrl) {
    this.portraitUrl = portraitUrl;
  }

  public CharacterValue getStrength() {
    return strength;
  }

  public CharacterValue getDexterity() {
    return dexterity;
  }

  public CharacterValue getConstitution() {
    return constitution;
  }

  public CharacterValue getPresence() {
    return presence;
  }

  public CharacterValue getInfluence() {
    return influence;
  }

  public CharacterValue getComposure() {
    return composure;
  }

  public CharacterValue getIntelligence() {
    return intelligence;
  }

  public CharacterValue getWits() {
    return wits;
  }

  public CharacterValue getResolve() {
    return resolve;
  }

  public CharacterValue getStamina() {
    return stamina;
  }

  public CharacterValue getConfidence() {
    return confidence;
  }

  public CharacterValue getFocus() {
    return focus;
  }

  public CharacterValue getHealth() {
    return health;
  }

  public CharacterValue getReputation() {
    return reputation;
  }

  public List<String> getCards() {
    return cards;
  }

  public CharacterValue getMana() {
    return mana;
  }

  public List<String> getProficiencies() {
    return proficiencies;
  }
}
