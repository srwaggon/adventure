export const noop = () => {
};
export const identity = x => x;

export const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
export const prettify = (cardType) => cardType.toLowerCase().split('_').map(capitalize).join(' ');

// TODO: remove, since copied to arrays.ts
export const arrayRemoveAll = (array, value) => {
  let i = 0;
  while (i < array.length) {
    if (array[i] === value) {
      array.splice(i, 1);
    } else {
      i++;
    }
  }
  return array;
}
