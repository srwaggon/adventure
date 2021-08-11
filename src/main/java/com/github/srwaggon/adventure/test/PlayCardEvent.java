package com.github.srwaggon.adventure.test;

import java.util.UUID;

// Represents a character's attempt to play a given card
public class PlayCardEvent {

  private UUID characterId;
  private UUID cardId;

  public UUID getCharacterId() {
    return characterId;
  }

  public void setCharacterId(UUID characterId) {
    this.characterId = characterId;
  }

  public UUID getCardId() {
    return cardId;
  }

  public void setCardId(UUID cardId) {
    this.cardId = cardId;
  }

  @Override
  public String toString() {
    return "PlayCardEvent{" +
        "characterId=" + characterId +
        ", cardId=" + cardId +
        '}';
  }
}
