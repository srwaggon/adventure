package com.github.srwaggon.adventure.game;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.srwaggon.adventure.util.JsonRepository;
import com.github.srwaggon.adventure.util.Repository;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.UUID;

@Configuration
public class GameConfiguration {

  @Bean
  public Repository<Game, UUID> gameRepository(ObjectMapper objectMapper) {
    return new JsonRepository<>(objectMapper, Game.class);
  }
}
