package com.github.srwaggon.adventure.card;

public class CardAppearance {

  private Boolean isFullArt = true;
  private String image;
  private String imageSize = "cover";
  private String imagePosition = "center top";
  private Boolean isDarkText = true;
  private String fontSize = "10pt";
  private double bodyOpacity = 80;

  public Boolean isFullArt() {
    return isFullArt;
  }

  public void setFullArt(Boolean fullArt) {
    isFullArt = fullArt;
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

  public String getImagePosition() {
    return imagePosition;
  }

  public void setImagePosition(String imagePosition) {
    this.imagePosition = imagePosition;
  }

  public Boolean isDarkText() {
    return isDarkText;
  }

  public void setDarkText(Boolean darkText) {
    isDarkText = darkText;
  }

  public String getFontSize() {
    return fontSize;
  }

  public void setFontSize(String fontSize) {
    this.fontSize = fontSize;
  }

  public double getBodyOpacity() {
    return bodyOpacity;
  }

  public void setBodyOpacity(double bodyOpacity) {
    this.bodyOpacity = bodyOpacity;
  }
}
