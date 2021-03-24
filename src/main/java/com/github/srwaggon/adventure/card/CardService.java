package com.github.srwaggon.adventure.card;

import com.github.srwaggon.adventure.util.Repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CardService {

  @Autowired
  private Repository<Card, String> cardRepository;

  public Card getById(String cardId) {
    return cardRepository.findById(cardId)
        .orElseThrow(() -> new RuntimeException("Card not found with id " + cardId));
  }

}
