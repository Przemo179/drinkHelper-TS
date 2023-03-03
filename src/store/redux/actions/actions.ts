import { Ingredient } from "../../types/types";
import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  UPDATE_VOLUME,
} from "../constants/constants";

export const addIngredient = (payload?: Ingredient) => ({
  type: ADD_INGREDIENT,
  payload,
});

export const removeIngredient = (payload?: Ingredient) => ({
  type: REMOVE_INGREDIENT,
  payload,
});

export const updateVolume = (payload?: Ingredient) => ({
  type: UPDATE_VOLUME,
  payload,
});
