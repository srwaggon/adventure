package com.github.srwaggon.adventure.character;

public enum BuiltinSkill {
  ATHLETICS("athletics"),
  ACROBATICS("acrobatics"),

  ACADEMIC("academic"),
  ARCANE("arcane"),
  HISTORY("history"),
  MEDICINE("medicine"),
  MERCANTILE("mercantile"),
  NATURE("nature"),
  RELIGION("religion"),

  ANIMAL_HANDLING("animal handling"),
  DECEPTION("deception"),
  INSIGHT("insight"),
  INTIMIDATION("intimidation"),
  PERFORMANCE("performance"),
  PERSUASION("persuasion"),

  INVESTIGATION("investigation"),
  PERCEPTION("perception"),
  SLEIGHT_OF_HAND("sleight of hand"),
  STEALTH("stealth"),
  SURVIVAL("survival"),

  BRAWL("brawl"),
  BLADED("bladed"),
  BLUNT("blunt"),
  GREATWEAPON("greatweapon"),
  LANCE("lance"),
  RANGED("ranged"),
  THROWING("throwing"),

  TRADE_FARMING("farming"),
  TRADE_HUNTING("hunting"),
  TRADE_MINING("mining"),
  TRADE_WOODCUTTING("woodcutting"),
  TRADE_BLACKSMITHING("blacksmithing"),
  TRADE_BREWING("brewing"),
  TRADE_CARPENTRY("carpentry"),
  TRADE_COOKING("cooking"),
  TRADE_ENCHANTING("enchanting"),
  TRADE_ENGINEERING("engineering"),
  TRADE_LEATHERWORKING("leatherworking"),
  TRADE_TAILORING("tailoring"),
  TRADE_WRITING("writing");

  private final String name;

  BuiltinSkill(String name) {
    this.name = name;
  }

  public String getName() {
    return name;
  }
}
