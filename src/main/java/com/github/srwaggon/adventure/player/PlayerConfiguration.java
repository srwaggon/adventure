package com.github.srwaggon.adventure.player;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.srwaggon.adventure.util.JsonRepository;
import com.github.srwaggon.adventure.util.Repository;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PlayerConfiguration {

  @Bean
  public Repository<Player, String> playerRepository(ObjectMapper objectMapper) {
    return new JsonRepository<>(objectMapper, Player.class);
  }

}
