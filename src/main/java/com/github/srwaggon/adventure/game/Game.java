package com.github.srwaggon.adventure.game;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.github.srwaggon.adventure.util.Identified;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

public class Game implements Identified<UUID> {

  private UUID id = UUID.randomUUID();

  private String name = "New Game";

  private String owner;

  private Set<String> players = new HashSet<>();

  @Override
  public UUID getId() {
    return this.id;
  }

  @Override
  public void setId(UUID id) {
    this.id = id;
  }

  public String getOwner() {
    return owner;
  }

  public void setOwner(String owner) {
    this.owner = owner;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Set<String> getPlayers() {
    return players;
  }

  public void setPlayers(Set<String> players) {
    this.players = players;
  }

  @JsonIgnore
  boolean isOwnedBy(String ownerId) {
    return getOwner().equals(ownerId);
  }

  @JsonIgnore
  boolean hasPlayer(String playerId) {
    return getPlayers().contains(playerId);
  }

  public void addPlayer(String playerId) {
    players.add(playerId);
  }

  public void removePlayer(String playerId) {
    players.remove(playerId);
  }
}
