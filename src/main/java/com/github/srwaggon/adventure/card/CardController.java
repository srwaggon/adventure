package com.github.srwaggon.adventure.card;

import com.github.srwaggon.adventure.util.Repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
public class CardController {

  @Autowired
  private CardService cardService;

  @Autowired
  private Repository<Card, String> cardRepository;

  @GetMapping("/cards")
  public List<Card> getAll() {
    return cardRepository.findAll();
  }

  @GetMapping("/cards/{id}")
  public Card getById(@PathVariable String id) {
    return cardRepository.findById(id).orElseThrow(() -> new RuntimeException("Card not found with id " + id));
  }

  @PostMapping("/cards")
  public Card newCard(@RequestBody Card card) {
    card.setId(UUID.randomUUID().toString());
    return cardRepository.save(card);
  }

  @PutMapping("/cards/{id}")
  public Card replaceCard(@RequestBody Card newCard, @PathVariable String id) {
    newCard.setId(id);
    return cardRepository.save(newCard);
  }

  @DeleteMapping("/cards/{id}")
  public void deleteById(@PathVariable String id) {
    cardRepository.findById(id)
        .ifPresent(cardRepository::delete);
  }
}
