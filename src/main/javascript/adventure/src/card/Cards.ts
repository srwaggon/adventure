type named = { name: number; };
export const byName = (card0: named, card1: named) => card0.name > card1.name ? 1 : -1;
