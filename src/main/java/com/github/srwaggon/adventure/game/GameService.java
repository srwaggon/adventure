package com.github.srwaggon.adventure.game;

import com.github.srwaggon.adventure.player.Player;
import com.github.srwaggon.adventure.player.PlayersService;
import com.github.srwaggon.adventure.util.Repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class GameService {

  @Autowired
  private Repository<Game, UUID> gameRepository;

  @Autowired
  private PlayersService playersService;

  public List<Game> getAll() {
    return gameRepository.findAll();
  }

  public Game getById(UUID gameId) {
    return gameRepository.findById(gameId)
        .orElseThrow(() -> new RuntimeException("Game not found with id " + gameId));
  }

  public List<Game> getAllWith(String playerId) {
    return gameRepository.findAll().stream()
        .filter(game -> game.isOwnedBy(playerId) || game.hasPlayer(playerId))
        .collect(Collectors.toList());
  }

  public List<Game> getAllOwnedBy(String playerId) {
    return gameRepository.findAll().stream()
        .filter(game -> game.isOwnedBy(playerId))
        .collect(Collectors.toList());
  }

  public List<Game> getAllWithPlayer(String playerId) {
    return gameRepository.findAll().stream()
        .filter(game -> game.hasPlayer(playerId))
        .collect(Collectors.toList());
  }

  public void deleteById(UUID gameId) {
    gameRepository.findById(gameId)
        .ifPresent(game -> gameRepository.delete(game));
  }

  public Game newGame() {
    Player currentPlayer = playersService.getCurrentPlayer();
    Game game = new Game();
    game.setOwner(currentPlayer.getId());
    return save(game);
  }

  public List<Game> getCurrentPlayersGames() {
    return getAllWith(playersService.getCurrentPlayer().getId());
  }

  public Game addPlayerToGame(UUID gameId, String playerId) {
    Game game = getById(gameId);
    Player player = playersService.getById(playerId);
    game.addPlayer(player.getId());
    return gameRepository.save(game);
  }

  public Game removePlayerFromGame(UUID gameId, String playerId) {
    Game game = getById(gameId);
    game.removePlayer(playerId);
    return gameRepository.save(game);
  }

  public Game save(Game game) {
    return gameRepository.save(game);
  }
}
