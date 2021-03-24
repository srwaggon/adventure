package com.github.srwaggon.adventure.character;

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

  @GetMapping("/{playerId}")
  public PlayerCharacter getById(@PathVariable UUID playerId) {
    return playerCharacterService.getCharacterById(playerId);
  }

  @PutMapping("/{playerId}")
  public PlayerCharacter replaceCharacter(@RequestBody PlayerCharacter newCharacter, @PathVariable UUID playerId) {
    newCharacter.setId(playerId);
    return characterRepository.save(newCharacter);
  }

  @DeleteMapping("/{playerId}")
  public void deleteCharacter(@PathVariable UUID playerId) {
    characterRepository.findById(playerId)
        .ifPresent(characterRepository::delete);
  }

  @PostMapping("/{playerId}/cards/{cardId}")
  public PlayerCharacter addCardToPlayer(
      @PathVariable UUID playerId,
      @PathVariable String cardId) {
    return playerCharacterService.addCardToPlayer(playerId, cardId);
  }

}
