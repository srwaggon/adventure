package com.github.srwaggon.adventure.player;


import com.fasterxml.jackson.databind.ObjectMapper;
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
import java.util.Random;

@RestController
public class PlayersController {

  @Autowired
  private ObjectMapper objectMapper;

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
    return playerRepository.save(player);
  }

  @PutMapping("/players/{id}")
  public Player replacePlayer(@RequestBody Player newPlayer, @PathVariable String id) {
    return playerRepository.findById(id)
        .map(player -> {
          return playerRepository.save(player);
        })
        .orElseGet(() -> {
          newPlayer.setId(id);
          return playerRepository.save(newPlayer);
        });
  }

  @DeleteMapping("/players/{id}")
  void deletePlayer(@PathVariable String id) {
    playerRepository.findById(id)
        .ifPresent(player -> playerRepository.delete(player));
  }

  private Player newPlayer() {
    Player player = new Player();
    player.setId(randomString());
    return player;
  }

  private String randomString() {
    int leftLimit = 97; // letter 'a'
    int rightLimit = 122; // letter 'z'
    int targetStringLength = 10;
    Random random = new Random();
    StringBuilder buffer = new StringBuilder(targetStringLength);
    for (int i = 0; i < targetStringLength; i++) {
      int randomLimitedInt = leftLimit + (int)
          (random.nextFloat() * (rightLimit - leftLimit + 1));
      buffer.append((char) randomLimitedInt);
    }
    return buffer.toString();
  }

}