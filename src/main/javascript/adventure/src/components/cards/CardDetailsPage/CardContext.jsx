import {createContext} from 'react';

const DEFAULT_CARD = null;
const DEFAULT_SET_CARD = (card) => {
};

export const CardContext = createContext([DEFAULT_CARD, DEFAULT_SET_CARD]);
