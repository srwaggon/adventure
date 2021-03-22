package com.github.srwaggon.adventure.character;

import com.github.srwaggon.adventure.util.Identified;

import java.util.UUID;

public class PlayerCharacter implements Identified<UUID> {

  private UUID id;
  private String name;

  @Override
  public UUID getId() {
    return id;
  }

  @Override
  public void setId(UUID uuid) {
    this.id = uuid;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }
}
