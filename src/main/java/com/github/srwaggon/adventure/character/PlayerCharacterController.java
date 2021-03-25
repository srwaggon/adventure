package com.github.srwaggon.adventure.character;

import com.github.srwaggon.adventure.card.Card;
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
@RequestMapping("/api/characters")
public class PlayerCharacterController {

  @Autowired
  private Repository<PlayerCharacter, UUID> characterRepository;

  @Autowired
  private PlayerCharacterService playerCharacterService;

  @GetMapping
  public List<PlayerCharacter> getAll() {
    return characterRepository.findAll();
  }

  @PostMapping
  public PlayerCharacter newCharacter() {
    return playerCharacterService.saveNewCharacter();
  }

  @GetMapping("/{characterId}")
  public PlayerCharacter getById(@PathVariable UUID characterId) {
    return playerCharacterService.getCharacterById(characterId);
  }

  @PutMapping("/{characterId}")
  public PlayerCharacter replaceCharacter(@RequestBody PlayerCharacter newCharacter, @PathVariable UUID characterId) {
    newCharacter.setId(characterId);
    return characterRepository.save(newCharacter);
  }

  @DeleteMapping("/{characterId}")
  public void deleteCharacter(@PathVariable UUID characterId) {
    characterRepository.findById(characterId)
        .ifPresent(characterRepository::delete);
  }

  @GetMapping("/{characterId}/cards")
  public List<Card> getCharactersCards(@PathVariable UUID characterId) {
    return playerCharacterService.getCharactersCards(characterId);
  }

  @PostMapping("/{characterId}/cards/{cardId}")
  public PlayerCharacter addCardToCharacter(
      @PathVariable UUID characterId,
      @PathVariable String cardId) {
    return playerCharacterService.addCardToCharacter(characterId, cardId);
  }

}
