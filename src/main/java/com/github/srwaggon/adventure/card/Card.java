package com.github.srwaggon.adventure.card;

import com.github.srwaggon.adventure.util.Identified;

public class Card implements Identified<String> {

  private String id;
  private String name;
  private CardType type;
  private String image;
  private String imageSize;
  private String body;
  private String flavor;

  public Card() {
  }

  public Card(String id, String name, CardType type, String image, String imageSize, String body, String flavor) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.image = image;
    this.imageSize = imageSize;
    this.body = body;
    this.flavor = flavor;
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

  public CardType getType() {
    return type;
  }

  public void setType(CardType type) {
    this.type = type;
  }

  public String getImage() {
    return image;
  }

  public void setImage(String image) {
    this.image = image;
  }

  public String getImageSize() {
    return imageSize;
  }

  public void setImageSize(String imageSize) {
    this.imageSize = imageSize;
  }

  public String getBody() {
    return body;
  }

  public void setBody(String body) {
    this.body = body;
  }

  public String getFlavor() {
    return flavor;
  }

  public void setFlavor(String flavor) {
    this.flavor = flavor;
  }
}
