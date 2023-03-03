/* eslint-disable react/react-in-jsx-scope */
import IngredientsSearchBar from "../../components/Dropdowns/IngredientsSearchBar";
import ProductsList from "../../components/Tables/IngredientsList";
export {};

export const Dashboard = () => {
  return (
    <div>
      <IngredientsSearchBar />
      <ProductsList />
    </div>
  );
};
