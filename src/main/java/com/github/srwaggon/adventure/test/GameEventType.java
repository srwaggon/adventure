package com.github.srwaggon.adventure.test;

public enum GameEventType {

  PLAY_CARD_EVENT("playCardEvent");

  private final String identifier;

  GameEventType(String identifier) {
    this.identifier = identifier;
  }

  public String getIdentifier() {
    return identifier;
  }
}
