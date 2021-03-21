package com.github.srwaggon.adventure.player;

import com.github.srwaggon.adventure.util.Identified;

public class Player implements Identified<String> {
  private String id;

  public Player() {
  }

  @Override
  public String getId() {
    return id;
  }

  @Override
  public void setId(String id) {
    this.id = id;
  }
}
