package com.github.srwaggon.adventure.character;

import static java.lang.Math.max;
import static java.lang.Math.min;

public class CharacterValue {

  private String name;
  private int value;
  private int minimum;
  private int maximum;

  public CharacterValue() {
  }

  public CharacterValue(String name, int minimum, int maximum, int value) {
    this.name = name;
    this.minimum = minimum;
    this.maximum = maximum;
    this.value = min(max(minimum, value), maximum);
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public int getValue() {
    return value;
  }

  public void setValue(int value) {
    this.value = value;
  }

  public int getMinimum() {
    return minimum;
  }

  public void setMinimum(int minimum) {
    this.minimum = minimum;
  }

  public int getMaximum() {
    return maximum;
  }

  public void setMaximum(int maximum) {
    this.maximum = maximum;
  }
}
