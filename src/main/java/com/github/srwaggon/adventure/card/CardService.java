package com.github.srwaggon.adventure.card;

import com.github.srwaggon.adventure.util.Repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CardService {

  @Autowired
  private Repository<Card, String> cardRepository;

  public Card getById(String cardId) {
    return cardRepository.findById(cardId)
        .orElseThrow(() -> new RuntimeException("Card not found with id " + cardId));
  }

  List<Card> getAll() {
    return cardRepository.findAll().stream()
        .sorted(Comparator.comparing(Card::getName))
        .collect(Collectors.toList());
  }
}
