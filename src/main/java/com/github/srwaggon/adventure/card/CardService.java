package com.github.srwaggon.adventure.card;

import com.github.srwaggon.adventure.util.Repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
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

  public List<Card> getByIds(List<String> ids) {
    return ids.stream()
        .map(id -> cardRepository.findById(id))
        .filter(Optional::isPresent)
        .map(Optional::get)
        .collect(Collectors.toList());
  }

  public List<Card> loadAndSaveAll() {
    List<Card> allCards = getAll();
    return saveAll(allCards);
  }

  public Card saveNewCard(String cardId, Card card) {
    cardRepository.findById(cardId).ifPresent(card1 -> {
      throw new CardWithIdAlreadyExistsException(cardId);
    });
    return saveCardWithId(cardId, card);
  }

  public Card saveCardWithId(String cardId, Card card) {
    card.setId(cardId);
    return save(card);
  }

  public Card save(Card card) {
    return cardRepository.save(card);
  }

  public List<Card> saveAll(List<Card> cards) {
    return cards.stream().map(card -> cardRepository.save(card)).toList();
  }

  public void deleteById(String cardId) {
    cardRepository.findById(cardId).ifPresent(cardRepository::delete);
  }
}
