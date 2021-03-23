package com.github.srwaggon.adventure.player;


import com.github.srwaggon.adventure.character.PlayerCharacter;
import com.github.srwaggon.adventure.character.PlayerCharacterService;
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
public class PlayersController {

  @Autowired
  private PlayersService playersService;

  @Autowired
  private PlayerCharacterService characterService;

  @Autowired
  private Repository<Player, String> playerRepository;

  @GetMapping("/players")
  public List<Player> getAllPlayers() {
    return playerRepository.findAll();
  }

  @GetMapping("/players/{id}")
  public Player getPlayerById(String id) {
    return playerRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Player not found with id" + id));
  }

  @PostMapping("/players")
  public Player newPlayer(@RequestBody Player player) {
    player.setId(UUID.randomUUID().toString());
    return playerRepository.save(player);
  }

  @PutMapping("/players/{id}")
  public Player replacePlayer(@RequestBody Player newPlayer, @PathVariable String id) {
    newPlayer.setId(id);
    return playerRepository.save(newPlayer);
  }

  @DeleteMapping("/players/{id}")
  public void deletePlayer(@PathVariable String id) {
    playerRepository.findById(id)
        .ifPresent(playerRepository::delete);
  }

  @GetMapping("/players/current")
  public Player getCurrentPlayer() {
    return playersService.getCurrentPlayer();
  }

  @GetMapping("/players/current/characters")
  public List<PlayerCharacter> getCurrentPlayersCharacters() {
    return characterService.getCurrentPlayersCharacters();
  }

}
