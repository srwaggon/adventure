package com.github.srwaggon.adventure.character;

import com.google.common.collect.Lists;

import com.github.srwaggon.adventure.util.Identified;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

public class PlayerCharacter implements Identified<UUID> {

  private UUID id = UUID.randomUUID();
  private String name = "New Character";
  private String portraitUrl = "https://i1.wp.com/nerdarchy.com/wp-content/uploads/2020/04/dd-fighters.jpg";

  private final List<String> cards = Lists.newArrayList();

  private List<Value<?>> properties = new ArrayList<>();

  private final Map<String, CharacterValue> skills =
      Arrays.stream(BuiltinSkill.values())
          .map(BuiltinSkill::getName)
          .map(skillName -> new CharacterValue(skillName, 0, 5, 0))
          .collect(Collectors.toMap(CharacterValue::getName, Function.identity()));

  public PlayerCharacter() {
    addAttributes();
    addResources();
    addSkills();
  }

  private void addAttributes() {
    for (String attributeName : new String[]{
        "strength",
        "agility",
        "endurance",
        "intelligence",
        "wisdom",
        "charisma",
        "luck"
    }) {
      properties.add(
          new Value<>(attributeName, "string", 1,
              new Value<>("type", "string", "attribute"),
              new Value<>("minimum", "integer", 0),
              new Value<>("maximum", "integer", 5)
          ));
    }
  }

  private void addResources() {
    for (String attributeName : new String[]{
        "health",
        "stamina",
        "charge"
    }) {
      properties.add(
          new Value<>(attributeName, "string", 10,
              new Value<>("type", "string", "resource"),
              new Value<>("minimum", "integer", 0),
              new Value<>("maximum", "integer", 10)
          ));
    }
  }

  private void addSkills() {
    Arrays.stream(BuiltinSkill.values())
        .map(BuiltinSkill::getName)
        .map(skillName -> new Value<>(skillName, "string", 0,
            new Value<>("type", "string", "skill"),
            new Value<>("minimum", "integer", 0),
            new Value<>("maximum", "integer", 5)
        ))
        .forEach(properties::add);
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

  public List<String> getCards() {
    return cards;
  }

  public Map<String, CharacterValue> getSkills() {
    return skills;
  }

  public List<Value<?>> getProperties() {
    return properties;
  }

  public void setProperties(List<Value<?>> properties) {
    this.properties = properties;
  }
}
