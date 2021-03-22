package com.github.srwaggon.adventure.character;

import static java.lang.Math.*;

public class CharacterValue {
  private int value;
  private int minimum;
  private int maximum;

  public CharacterValue() {
  }

  public CharacterValue(int minimum, int maximum, int value) {
    this.minimum = minimum;
    this.maximum = maximum;
    this.value = min(max(minimum, value), maximum);
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
