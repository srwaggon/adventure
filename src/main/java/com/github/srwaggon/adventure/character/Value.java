package com.github.srwaggon.adventure.character;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Value<T> {
  private String name;
  private String type;
  private T value;
  private final List<Value<?>> properties = new ArrayList<>();

  public Value(String name, String type, T value, List<Value<?>> properties) {
    this.name = name;
    this.type = type;
    this.value = value;
    this.properties.addAll(properties);
  }

  public Value(String name, String type, T value, Value<?>... properties) {
    this.name = name;
    this.type = type;
    this.value = value;
    Collections.addAll(this.properties, properties);
  }

  public Value() {
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public T getValue() {
    return value;
  }

  public void setValue(T value) {
    this.value = value;
  }

  public List<Value<?>> getProperties() {
    return properties;
  }

  public List<Value<?>> addProperty(Value<?> property) {
    properties.add(property);
    return properties;
  }

  public Value<?> getPropertyByName(String name) {
    return properties.stream().filter(p -> p.getName().equals(name)).findFirst().orElse(null);
  }

  public void removeProperty(Value<?> property) {
    properties.remove(property);
  }

}
