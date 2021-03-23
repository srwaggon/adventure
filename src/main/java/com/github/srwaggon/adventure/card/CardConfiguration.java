package com.github.srwaggon.adventure.card;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.srwaggon.adventure.util.JsonRepository;
import com.github.srwaggon.adventure.util.Repository;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CardConfiguration {

  @Bean
  public Repository<Card, String> cardRepository(ObjectMapper objectMapper) {
    return new JsonRepository<>(objectMapper, Card.class);
  }
}
