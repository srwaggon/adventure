package com.github.srwaggon.adventure.character;

import com.github.srwaggon.adventure.player.Player;
import com.github.srwaggon.adventure.player.PlayersService;
import com.github.srwaggon.adventure.util.Repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class PlayerCharacterService {

  @Autowired
  private Repository<PlayerCharacter, UUID> characterRepository;

  @Autowired
  private PlayersService playersService;

  public PlayerCharacter saveNewCharacter(PlayerCharacter character) {
    Player currentPlayer = playersService.getCurrentPlayer();

    character.setId(UUID.randomUUID());

    PlayerCharacter savedCharacter = characterRepository.save(character);
    playersService.addCharacter(currentPlayer, character);
    return savedCharacter;
  }
}
