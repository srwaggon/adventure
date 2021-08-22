package com.github.srwaggon.adventure.card.edition;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.srwaggon.adventure.util.JsonRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public class EditionRepository extends JsonRepository<Edition, UUID> {

  @Autowired
  public EditionRepository(ObjectMapper objectMapper) {
    super(objectMapper, Edition.class);
  }
}
