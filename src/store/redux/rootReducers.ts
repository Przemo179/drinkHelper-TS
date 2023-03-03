import { combineReducers } from "redux";
import ingredientsReducer from "../redux/reducers/reducers";
import { IngredientsState } from "../types/types";

// export interface RootState {
//   ingredients: IngredientsState;
// }

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
});

// export type ApplicationState = ReturnType<typeof rootReducer>; dałem póki co any bo dalej nie działało :(
export type ApplicationState = { ingredients: IngredientsState };
