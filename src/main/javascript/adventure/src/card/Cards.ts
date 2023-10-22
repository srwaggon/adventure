import type {CardAppearanceType} from "./CardAppearance";
import {CardAppearance} from "./CardAppearance";

type named = { name: number; };

export const byName = (card0: named, card1: named) => card0.name > card1.name ? 1 : -1;


type CardType = {
  name?: string,

  type?: string,
  quality?: string,
  body?: string,
  flavor?: string,
  author?: string,
  editionId?: string,

  fullArt?: boolean
  image?: string,
  imageSize?: string,
  imagePosition?: string,
  darkText?: boolean,
  bodyOpacity?: number,
  fontSize?: string,

  appearance?: CardAppearanceType
};


export class Card {

  private _card: CardType;

  constructor(card: CardType) {
    this._card = card || {};
  }

  public getName = () => this._card.name || "New Card";

  public getType = () => this._card.type || "ABILITY";

  public getQuality = () => this._card.quality || "COMMON";

  public isCommon = () => this._card.quality && this._card.quality === "COMMON";

  public getBody = () => this._card.body || "";

  public getFlavor = () => this._card.flavor || "";

  public getAppearance = () => new CardAppearance(this._card.appearance || {});

}

export const exports = {
  byName,
};

export type {CardType};
