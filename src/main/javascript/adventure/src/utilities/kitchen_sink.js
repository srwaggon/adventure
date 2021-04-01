export const noop = () => {
};
export const identity = x => x;

export const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
export const prettify = (cardType) => cardType.toLowerCase().split('_').map(capitalize).join(' ');
export const arrayRemove = (array, value) => {
  const index = array.indexOf(value);
  if (index > -1) {
    array.splice(index, 1);
  }
  return array;
};

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

export const arrayRemoveAt = (array, index) => {
  array.splice(index, 1);
  return array;
}