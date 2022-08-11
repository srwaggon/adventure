package com.github.srwaggon.adventure.card;

public class CardWithIdAlreadyExistsException extends RuntimeException {
  public CardWithIdAlreadyExistsException(String cardId) {
    super("Card with id " + cardId + " already exists.");
  }
}
