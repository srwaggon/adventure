package com.github.srwaggon.adventure.card;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public class Prerequisites {
  private List<Map.Entry<String, Integer>> attributePrerequisites = new ArrayList<>();
  private List<Map.Entry<String, Integer>> skillPrerequisites = new ArrayList<>();
  private List<UUID> cardPrerequisites = new ArrayList<>();

  public List<Map.Entry<String, Integer>> getAttributePrerequisites() {
    return attributePrerequisites;
  }

  public void setAttributePrerequisites(List<Map.Entry<String, Integer>> attributePrerequisites) {
    this.attributePrerequisites = attributePrerequisites;
  }

  public List<Map.Entry<String, Integer>> getSkillPrerequisites() {
    return skillPrerequisites;
  }

  public void setSkillPrerequisites(List<Map.Entry<String, Integer>> skillPrerequisites) {
    this.skillPrerequisites = skillPrerequisites;
  }

  public List<UUID> getCardPrerequisites() {
    return cardPrerequisites;
  }

  public void setCardPrerequisites(List<UUID> cardPrerequisites) {
    this.cardPrerequisites = cardPrerequisites;
  }
}
