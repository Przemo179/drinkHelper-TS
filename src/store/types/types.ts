// Redux types
export type Ingredient = {
  id: number;
  label: string;
  unit: string;
  volume: number;
};

export type IngredientsState = {
  ingredientsList: Ingredient[];
};

// IngredientsSearchBar
export type SelectedItem = {
  label: string;
  unit: string;
};

export type SelectedArray = {
  selected: SelectedItem[];
};

export type ChangeValueProps = {
  id: number;
  volume: number;
};

// UpdateIngredientVolume
export type UpdateVolumeProps = {
  changeValueOfSingleIngr: (id: number) => void;
  updateValueChange: () => void;
  cancelChanging: () => void;
  changeValue: ChangeValueProps;
};

// IngredientsRow
export type IngredientRowProps = {
  id: number;
  ingredient: Ingredient;
  removeFromStore: (id: number) => void;
  setChangeValue: React.Dispatch<React.SetStateAction<ChangeValueProps>>;
  changeValue: ChangeValueProps;
  changeValueOfSingleIngr: (id: number) => void;
  cancelChanging: () => void;
  updateValueChange: () => void;
};

// DrinkList //
export type CompositionProp = {
  ingredient: string;
  volume: number;
  unit: string;
};

export type DrinkIngredientsProp = {
  name: string;
  ingredients: CompositionProp[];
};

export type DrinkDetailsProps = {
  name: string;
  composition: CompositionProp[];
  lenght: number;
  photo: string;
  recipe: string[];
  link: string;
};

export type DrinkProps = {
  visible: boolean;
  fullDrink: DrinkDetailsProps;
  id: number;
};

// RecipePane
export type RecipePaneProps = {
  visible: boolean;
  name: string;
  ingredients: CompositionProp[];
  photo: string;
  recipe: string[];
  closePanel: () => void;
  id: number;
  addToFavorite: (drinkName: string) => void;
  isFavorite: boolean;
};

// DrinkRow
export type DrinkRowProps = {
  id: number;
  currentDrink: DrinkDetailsProps;
  currentDrinkLenght: number;
  drinkName: string;
  filteredDrinkLenght: number;
  filteredDrinkIngredients: CompositionProp[];
  missingIngredients: CompositionProp[];
  showRecipe: (drink: DrinkDetailsProps, id: number) => void;
  addToFavorite: (drinkName: string) => void;
  isFavorite: boolean;
};

// GameBoard
export type GameProps = {
  boardSize: number;
  percentForLightsOn: number;
};

// Cell
export type CellProps = {
  cellIndex: string;
  isSwitchedOn: boolean;
  updateGameGrid: (cellIndex: string) => void;
};
