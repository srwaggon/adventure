package com.github.srwaggon.adventure.card;

import com.github.srwaggon.adventure.util.Identified;

import java.util.Optional;
import java.util.UUID;

public class Card implements Identified<String> {

  private String id;

  private String name;
  private CardType type = CardType.ABILITY;
  private CardQuality quality = CardQuality.COMMON;
  private UUID editionId;
  private String body;
  private String flavor;
  private String author;

  private boolean isFullArt = true;
  private String image;
  private String imageSize = "cover";
  private String imagePosition = "center top";
  private boolean isDarkText = true;
  private String fontSize = "10pt";
  private double bodyOpacity = 80;

  private int costInExperience;
  private Prerequisites prerequisites = new Prerequisites();
  private CardAppearance appearance = new CardAppearance();

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

  public boolean isFullArt() {
    return Optional.ofNullable(appearance.isFullArt()).orElse(isFullArt);
  }

  public void setFullArt(boolean fullArt) {
    this.isFullArt = fullArt;
    this.appearance.setFullArt(fullArt);
  }

  public String getImage() {
    return Optional.ofNullable(appearance.getImage()).orElse(image);
  }

  public void setImage(String image) {
    this.image = image;
    this.appearance.setImage(image);
  }

  public String getImageSize() {
    return Optional.ofNullable(appearance.getImageSize()).orElse(imageSize);
  }

  public void setImageSize(String imageSize) {
    this.imageSize = imageSize;
    this.appearance.setImageSize(imageSize);
  }

  public String getImagePosition() {
    return Optional.ofNullable(appearance.getImagePosition()).orElse(imagePosition);
  }

  public void setImagePosition(String imagePosition) {
    this.imagePosition = imagePosition;
    this.appearance.setImagePosition(imagePosition);
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
    return Optional.ofNullable(appearance.isDarkText()).orElse(isDarkText);
  }

  public void setDarkText(boolean isDarkText) {
    this.isDarkText = isDarkText;
    this.appearance.setDarkText(isDarkText);
  }

  public UUID getEditionId() {
    return editionId;
  }

  public void setEditionId(UUID editionId) {
    this.editionId = editionId;
  }

  public String getFontSize() {
    return Optional.ofNullable(fontSize).orElse(fontSize);
  }

  public void setFontSize(String fontSize) {
    this.fontSize = fontSize;
    this.appearance.setFontSize(fontSize);
  }

  public double getBodyOpacity() {
    return Optional.ofNullable(bodyOpacity).orElse(bodyOpacity);
  }

  public void setBodyOpacity(double bodyOpacity) {
    this.bodyOpacity = bodyOpacity;
    this.appearance.setBodyOpacity(bodyOpacity);
  }

  public int getCostInExperience() {
    return costInExperience;
  }

  public void setCostInExperience(int costInExperience) {
    this.costInExperience = costInExperience;
  }

  public Prerequisites getPrerequisites() {
    return prerequisites;
  }

  public void setPrerequisites(Prerequisites prerequisites) {
    this.prerequisites = prerequisites;
  }

  public CardAppearance getAppearance() {
    return appearance;
  }

  public void setAppearance(CardAppearance appearance) {
    this.appearance = appearance;
  }
}
