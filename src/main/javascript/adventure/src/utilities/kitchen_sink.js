export const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
export const prettifyCardType = (cardType) => cardType.toLowerCase().split('_').map(capitalize).join(' ');