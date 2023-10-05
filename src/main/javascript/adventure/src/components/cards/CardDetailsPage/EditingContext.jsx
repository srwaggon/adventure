import {createContext} from 'react';

const DEFAULT_IS_EDITING = false;
const DEFAULT_SET_IS_EDITING = () => {
};

export const EditingContext = createContext([DEFAULT_IS_EDITING, DEFAULT_SET_IS_EDITING]);
