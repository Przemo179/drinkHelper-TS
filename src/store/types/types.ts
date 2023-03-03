export type Ingredient = {
  id: number;
  label: string;
  unit: string;
  volume: number;
};

export type IngredientsState = {
  ingredientsList: Ingredient[];
};

export type SelectedItem = {
  label: string;
  unit: string;
};

export type SelectedArray = {
  selected: SelectedItem[];
};
