package com.github.srwaggon.adventure.card;

import com.github.srwaggon.adventure.util.Identified;

public class Card implements Identified<String> {

  private String id;
  private String name;
  private CardType type;
  private CardQuality quality;
  private String image;
  private String imageSize;
  private String body;
  private String flavor;
  private String author;
  private boolean isDarkText = false;

  public Card() {
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

  public CardQuality getQuality() {
    return quality;
  }

  public void setQuality(CardQuality quality) {
    this.quality = quality;
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

  public String getAuthor() {
    return author;
  }

  public void setAuthor(String author) {
    this.author = author;
  }

  public boolean isDarkText() {
    return isDarkText;
  }

  public void setDarkText(boolean isDarkText) {
    this.isDarkText = isDarkText;
  }
}
