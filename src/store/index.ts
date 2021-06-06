import { combineReducers } from 'redux';

import app from '../reducers/app';
import pokemons, { IPokemonsInitialState } from '../reducers/pokemons';

export interface IInitialState {
  pokemons: IPokemonsInitialState;
}

const createRootReducer = () => {
  return combineReducers({
    app,
    pokemons,
  });
};

export default createRootReducer;
