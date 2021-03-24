package com.github.srwaggon.adventure.card;

import com.github.srwaggon.adventure.util.Repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/cards")
public class CardController {

  @Autowired
  private CardService cardService;

  @Autowired
  private Repository<Card, String> cardRepository;

  @GetMapping
  public List<Card> getAll() {
    return cardRepository.findAll();
  }

  @PostMapping
  public Card newCard(@RequestBody Card card) {
    card.setId(UUID.randomUUID().toString());
    return cardRepository.save(card);
  }

  @GetMapping("/{cardId}")
  public Card getById(@PathVariable String cardId) {
    return cardService.getById(cardId);
  }

  @PutMapping("/{cardId}")
  public Card replaceCard(@RequestBody Card newCard, @PathVariable String cardId) {
    newCard.setId(cardId);
    return cardRepository.save(newCard);
  }

  @DeleteMapping("/{cardId}")
  public void deleteById(@PathVariable String cardId) {
    cardRepository.findById(cardId)
        .ifPresent(cardRepository::delete);
  }
}
