package com.github.srwaggon.adventure.card;

import com.google.common.collect.Lists;

import com.github.srwaggon.adventure.card.edition.Edition;
import com.github.srwaggon.adventure.card.edition.EditionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/cards")
public class CardController {

  @Autowired
  private CardService cardService;

  @Autowired
  private EditionService editionService;

  @GetMapping
  public List<Card> getAll(@RequestParam Optional<List<String>> ids) {
    if (ids.isPresent()) {
      List<String> idsList = ids.get();
      if (!idsList.isEmpty()) {
        return cardService.getByIds(idsList);
      }
    }
    return cardService.getAll();
  }

  @PostMapping
  public Card newCard(@RequestBody Card card) {
    String cardId = UUID.randomUUID().toString();
    return cardService.saveNewCard(cardId, card);
  }

  @GetMapping("/{cardId}")
  public Card getById(@PathVariable String cardId) {
    return cardService.getById(cardId);
  }

  @PutMapping("/{cardId}")
  public Card replaceCard(@RequestBody Card newCard, @PathVariable String cardId) {
    return cardService.saveCardWithId(cardId, newCard);
  }

  @DeleteMapping("/{cardId}")
  public void deleteById(@PathVariable String cardId) {
    cardService.deleteById(cardId);
  }

  @GetMapping("/types")
  public List<CardType> getTypes() {
    return Lists.newArrayList(CardType.values());
  }

  @GetMapping("/qualities")
  public List<CardQuality> getQualities() {
    return Lists.newArrayList(CardQuality.values());
  }

  @GetMapping("/editions")
  public List<Edition> getEditions() {
    return editionService.getAll();
  }

  @PostMapping("/loadAndSaveAll")
  public List<Card> loadAndSaveAll() {
    return cardService.loadAndSaveAll();
  }
}
