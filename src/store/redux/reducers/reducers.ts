/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  UPDATE_VOLUME,
} from "../constants/constants";
import { Ingredient } from "../../types/types";
import { Reducer } from "react";

interface IngredientsState {
  // zmiana z type na interface //
  ingredientsList: Ingredient[];
}

const initialState: IngredientsState = {
  ingredientsList: [],
};

// redux element for array of elements
const ingredientsReducer: Reducer<IngredientsState, any> = (
  state = initialState,
  action
): IngredientsState => {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredientsList: [...state.ingredientsList, action.payload],
      };
    case REMOVE_INGREDIENT:
      return {
        ...state,
        ingredientsList: [
          ...state.ingredientsList.slice(0, action.payload.id),
          ...state.ingredientsList.slice(action.payload.id + 1),
        ],
      };
    case UPDATE_VOLUME:
      return {
        ...state,
        ingredientsList: [
          ...state.ingredientsList.map((ingredient) => {
            if (ingredient.id === action.payload.id) {
              return {
                ...ingredient,
                volume: action.payload.volume,
              };
            } else {
              return ingredient;
            }
          }),
        ],
      };
    default:
      return state;
  }
};

export default ingredientsReducer;
