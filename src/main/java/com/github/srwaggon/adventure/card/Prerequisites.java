package com.github.srwaggon.adventure.card;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javafx.util.Pair;

public class Prerequisites {
  private List<Pair<String, Integer>> attributePrerequisites = new ArrayList<>();
  private List<Pair<String, Integer>> skillPrerequisites = new ArrayList<>();
  private List<UUID> cardPrerequisites = new ArrayList<>();

  public List<Pair<String, Integer>> getAttributePrerequisites() {
    return attributePrerequisites;
  }

  public void setAttributePrerequisites(List<Pair<String, Integer>> attributePrerequisites) {
    this.attributePrerequisites = attributePrerequisites;
  }

  public List<Pair<String, Integer>> getSkillPrerequisites() {
    return skillPrerequisites;
  }

  public void setSkillPrerequisites(List<Pair<String, Integer>> skillPrerequisites) {
    this.skillPrerequisites = skillPrerequisites;
  }

  public List<UUID> getCardPrerequisites() {
    return cardPrerequisites;
  }

  public void setCardPrerequisites(List<UUID> cardPrerequisites) {
    this.cardPrerequisites = cardPrerequisites;
  }
}
