package com.github.srwaggon.adventure.player;

import com.github.srwaggon.adventure.util.Identified;

public class Player implements Identified<String> {

  private String id;

  private String name;

  public Player() {
  }

  public Player(String id, String name) {
    this.id = id;
    this.name = name;
  }

  @Override
  public String getId() {
    return id;
  }

  @Override
  public void setId(String id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }
}
