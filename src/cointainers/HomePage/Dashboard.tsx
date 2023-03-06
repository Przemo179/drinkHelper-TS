/* eslint-disable react/react-in-jsx-scope */
import IngredientsSearchBar from "../../components/Dropdowns/IngredientsSearchBar";
import DrinksList from "../../components/Tables/DrinksList";
import ProductsList from "../../components/Tables/IngredientsList";
export {};

export const Dashboard = () => {
  return (
    <div>
      <IngredientsSearchBar />
      <ProductsList />
      <DrinksList />
    </div>
  );
};
