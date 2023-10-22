type CardAppearanceType = {
  image?: string,
  imageSize?: string,
  imagePosition?: string,
  fullArt?: boolean
  darkText?: boolean,
  bodyOpacity?: number,
  fontSize?: string,
};

export class CardAppearance {

  private _appearance: CardAppearanceType;

  constructor(appearance: CardAppearanceType) {
    this._appearance = appearance || {};
  }

  public isFullArt = () => this._appearance.fullArt == true;

  public getImage = () => this._appearance.image || "";

  public getImageSize = () => this._appearance.imageSize || "cover";

  public getImagePosition = () => this._appearance.imagePosition || "center top";

  public isDarkText = () => this._appearance.darkText == true;

  public getBodyOpacity = () => this._appearance.bodyOpacity || 0;

  public getFontSize = () => this._appearance.fontSize || "10pt";

}

export type {CardAppearanceType};
