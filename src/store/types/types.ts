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

export type UpdateVolumeProps = {
  changeValueOfSingleIngr: (id: number) => void;
  updateValueChange: () => void;
  cancelChanging: () => void;
  changeValue: changeValueProps;
};

export type IngredientRowProps = {
  id: number;
  ingredient: Ingredient;
  removeFromStore: (id: number) => void;
  setChangeValue: React.Dispatch<React.SetStateAction<changeValueProps>>;
  changeValue: changeValueProps;
  changeValueOfSingleIngr: (id: number) => void;
  cancelChanging: () => void;
  updateValueChange: () => void;
};

export type changeValueProps = {
  id: number;
  volume: number;
};
