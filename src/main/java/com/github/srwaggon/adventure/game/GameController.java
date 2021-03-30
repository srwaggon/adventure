package com.github.srwaggon.adventure.game;

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
@RequestMapping("/api/games")
public class GameController {

  @Autowired
  public GameService gameService;

  @GetMapping
  public List<Game> getAll() {
    return gameService.getAll();
  }

  @PostMapping
  public Game newGame() {
    return gameService.newGame();
  }

  @GetMapping("/{gameId}")
  public Game getById(@PathVariable UUID gameId) {
    return gameService.getById(gameId);
  }

  @PutMapping("/{gameId}")
  public Game updateGame(@RequestBody Game game, @PathVariable UUID gameId) {
    game.setId(gameId);
    return gameService.save(game);
  }

  @DeleteMapping("/{gameId}")
  public void deleteById(@PathVariable UUID gameId) {
    gameService.deleteById(gameId);
  }

  @PutMapping("/{gameId}/players/{playerId}")
  public Game addPlayerToGame(@PathVariable UUID gameId, @PathVariable String playerId) {
    return gameService.addPlayerToGame(gameId, playerId);
  }

  @DeleteMapping("/{gameId}/players/{playerId}")
  public Game removePlayerFromGame(@PathVariable UUID gameId, @PathVariable String playerId) {
    return gameService.removePlayerFromGame(gameId, playerId);
  }

}
