package com.github.srwaggon.adventure.player;


import com.github.srwaggon.adventure.character.PlayerCharacter;
import com.github.srwaggon.adventure.character.PlayerCharacterService;
import com.github.srwaggon.adventure.game.Game;
import com.github.srwaggon.adventure.game.GameService;
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
@RequestMapping("/api/players")
public class PlayersController {

  @Autowired
  private PlayersService playersService;

  @Autowired
  private PlayerCharacterService characterService;

  @Autowired
  private GameService gameService;

  @Autowired
  private Repository<Player, String> playerRepository;

  @GetMapping
  public List<Player> getAllPlayers() {
    return playerRepository.findAll();
  }

  @PostMapping
  public Player newPlayer(@RequestBody Player player) {
    player.setId(UUID.randomUUID().toString());
    return playerRepository.save(player);
  }

  @GetMapping("/{id}")
  public Player getPlayerById(String id) {
    return playersService.getById(id);
  }

  @PutMapping("/{id}")
  public Player replacePlayer(@RequestBody Player newPlayer, @PathVariable String id) {
    newPlayer.setId(id);
    return playerRepository.save(newPlayer);
  }

  @DeleteMapping("/{id}")
  public void deletePlayer(@PathVariable String id) {
    playerRepository.findById(id)
        .ifPresent(playerRepository::delete);
  }

  @GetMapping("/current")
  public Player getCurrentPlayer() {
    return playersService.getCurrentPlayer();
  }

  @GetMapping("/current/characters")
  public List<PlayerCharacter> getCurrentPlayersCharacters() {
    return characterService.getCurrentPlayersCharacters();
  }

  @GetMapping("/current/games")
  public List<Game> getCurrentPlayersGames() {
    return gameService.getCurrentPlayersGames();
  }

}
