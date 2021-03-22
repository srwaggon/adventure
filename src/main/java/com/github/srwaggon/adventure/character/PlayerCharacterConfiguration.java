package com.github.srwaggon.adventure.character;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.srwaggon.adventure.util.JsonRepository;
import com.github.srwaggon.adventure.util.Repository;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.UUID;

@Configuration
public class PlayerCharacterConfiguration {

  @Bean
  public Repository<PlayerCharacter, UUID> characterRepository(ObjectMapper objectMapper) {
    return new JsonRepository<>(objectMapper, PlayerCharacter.class);
  }
}
