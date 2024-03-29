export const BLACK = "#000000";
export const RARE_BLUE = "#0070dd";
export const BROWN = "sienna";
export const UNCOMMON_GREEN = "#00bb00";
export const POOR_GREY = "#9d9d9d";
export const ARTIFACT_LIGHT_GOLD = "#e6cc80";
export const ARTIFACT_BRONZE = "#BE8972";
export const LEGENDARY_ORANGE = "#ff8000";
export const EPIC_PURPLE = "#a335ee";
export const RED = "#b6372b";
export const MYTHIC_RED = "#b6372b";
export const SILVER = "silver";
export const COMMON_WHITE = "#ffffff"

export const DARK_MODE_BLACK = "#222222";
export const NEUTRAL_MODE_GREY = "#666666";
export const LIGHT_MODE_WHITE = "#f8f8f8";

export const Colors = {
  BLACK,
  BROWN,
  POOR_GREY,
  COMMON_WHITE,
  UNCOMMON_GREEN,
  RARE_BLUE,
  EPIC_PURPLE,
  LEGENDARY_ORANGE,
  MYTHIC_RED,
  ARTIFACT_LIGHT_GOLD,
  ARTIFACT_BRONZE,
  RED,
  SILVER,
}

export const getQualityColor = (quality: string | null): string => {
  if (quality === null) {
    return Colors.COMMON_WHITE;
  }

  const qualityToColourMap: { [key: string]: string } = {
    "POOR": Colors.POOR_GREY,
    "COMMON": Colors.COMMON_WHITE,
    "UNCOMMON": Colors.UNCOMMON_GREEN,
    "RARE": Colors.RARE_BLUE,
    "EPIC": Colors.EPIC_PURPLE,
    "LEGENDARY": Colors.LEGENDARY_ORANGE,
    "MYTHIC": Colors.MYTHIC_RED,
    "ARTIFACT": Colors.ARTIFACT_BRONZE,
    "UNIQUE": Colors.RED,
  };

  return qualityToColourMap[quality.toUpperCase()] || Colors.COMMON_WHITE;
};

export const exports = {
  Colors,
  getQualityColor
};

export default exports;
