package com.github.srwaggon.adventure.character;

import com.github.srwaggon.adventure.util.Repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
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

  @PutMapping("/characters")
  public PlayerCharacter newCharacter() {
    return playerCharacterService.saveNewCharacter();
  }

}
