import { Dispatch } from 'react';
import { IStateRequest } from '../interface';
import { IInitialState } from '../store';
import req from '../utils';

export enum PokemonsActionTypes {
  FETCH_TYPES = 'FETCH_TYPES',
  FETCH_TYPES_RESOLVE = 'FETCH_TYPES_RESOLVE',
  FETCH_TYPES_REJECT = 'FETCH_TYPES_REJECT',
}

interface TypesAction {
  type: PokemonsActionTypes;
  payload?: string[];
}

type ActionTypes = TypesAction;

export interface IPokemonsInitialState {
  types: IStateRequest<string>;
}

const initialState: IPokemonsInitialState = {
  types: {
    isLoading: false,
    data: null,
    error: null,
  },
};

type ITypesRequest = string[];

const pokemons = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case PokemonsActionTypes.FETCH_TYPES:
      return {
        ...state,
        types: {
          isLoading: true,
          data: null,
          error: null,
        },
      };
    case PokemonsActionTypes.FETCH_TYPES_RESOLVE:
      return {
        ...state,
        types: {
          isLoading: true,
          data: action.payload,
          error: null,
        },
      };
    case PokemonsActionTypes.FETCH_TYPES_REJECT:
      return {
        ...state,
        types: {
          isLoading: false,
          data: null,
          error: action.payload,
        },
      };
    default:
      return state;
  }
};

export const getPokemonsTypes = (state: IInitialState) => state.pokemons.types.data;
export const getPokemonsTypesLoading = (state: IInitialState) => state.pokemons.types.isLoading;

export const getTypesAction = () => {
  return async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PokemonsActionTypes.FETCH_TYPES });
    try {
      const data = await req<ITypesRequest>('getPokemonTypes', {});
      dispatch({ type: PokemonsActionTypes.FETCH_TYPES_RESOLVE, payload: data });
    } catch (error) {
      dispatch({ type: PokemonsActionTypes.FETCH_TYPES_REJECT, payload: error });
    }
  };
};

export default pokemons;
