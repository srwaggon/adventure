package com.github.srwaggon.adventure.character;

import com.github.srwaggon.adventure.util.Repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
public class PlayerCharacterController {

  @Autowired
  private Repository<PlayerCharacter, UUID> characterRepository;

  @Autowired
  private PlayerCharacterService playerCharacterService;

  @GetMapping("/characters/{id}")
  public PlayerCharacter getById(@PathVariable UUID id) {
    return characterRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Player Character not found with id " + id));
  }

  @PostMapping("/characters")
  public PlayerCharacter newCharacter() {
    return playerCharacterService.saveNewCharacter();
  }

  @PutMapping("/characters/{id}")
  public PlayerCharacter replaceCharacter(@RequestBody PlayerCharacter newCharacter, @PathVariable UUID id) {
    return characterRepository.findById(id).
        map(character -> characterRepository.save(newCharacter))
        .orElseGet(() -> {
          newCharacter.setId(id);
          return characterRepository.save(newCharacter);
        });
  }

  @DeleteMapping("/characters/{id}")
  public void deleteCharacter(@PathVariable UUID id) {
    characterRepository.findById(id)
        .ifPresent(character -> characterRepository.delete(character));
  }

}
