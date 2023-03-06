import { useState } from "react";
import data from "../../store/dataSource/drinks.json";
import ingredientData from "../../store/dataSource/ingredients.json";
import { connect } from "react-redux";
import { Table, Container } from "react-bootstrap";
import { DrinkRow } from "../../cointainers/DrinkInformation/DrinkRow";
import RecipePane from "../../cointainers/DrinkInformation/RecipePane";
import "../../styles/DrinkList.css";
import { ApplicationState } from "../../store/redux/rootReducers";
import {
  CompositionProp,
  DrinkDetailsProps,
  DrinkProps,
  Ingredient,
  DrinkIngredientsProp,
} from "../../store/types/types";

type StateProps = {
  ingredients: Ingredient[];
};

type Props = StateProps;

const initDrinkDetailsProps = {
  name: "",
  composition: [],
  lenght: 0,
  photo: "",
  recipe: [],
  link: "",
};

const DrinkList = ({ ingredients }: Props) => {
  const [dataState, setData] = useState(data);
  const [drinkDetails, setDrinkDetails] = useState<DrinkProps>({
    visible: false,
    fullDrink: initDrinkDetailsProps,
    id: -1,
  });
  const [showFullList, setShowFullList] = useState(false);
  const [choosenFilter, setChoosenFilter] = useState<string>("");
  const [selectedIngredient, setSelectedIngredient] = useState("Vodka");
  const [favoriteDrinks, setFavoriteDrinks] = useState<string[]>([]);

  const showAllRecipes = () => {
    setShowFullList(true);
  };

  const showRecipe = (drink: DrinkDetailsProps, id: number) => {
    setDrinkDetails({
      visible: true,
      fullDrink: drink,
      id: id,
    });
  };

  const closeRecipePane = () => {
    setDrinkDetails({
      visible: false,
      fullDrink: initDrinkDetailsProps,
      id: -1,
    });
  };

  const filteredData: DrinkIngredientsProp[] = [];
  const missingIngredients: DrinkIngredientsProp[] = [];

  for (
    let drinkIndex = 0;
    drinkIndex < dataState.drinksList.length;
    drinkIndex++
  ) {
    const currentDrink: DrinkDetailsProps = dataState.drinksList[drinkIndex];
    const drinkIngredients: CompositionProp[] = [];
    for (
      let compositionIndex = 0;
      compositionIndex < currentDrink.composition.length;
      compositionIndex++
    ) {
      const currentIng: CompositionProp =
        currentDrink.composition[compositionIndex];
      const match = ingredients.find(
        (drink) =>
          drink.label === currentIng.ingredient &&
          drink.volume >= currentIng.volume
      );
      if (match) {
        drinkIngredients.push(currentIng);
      } else {
        const missingIndex = missingIngredients.findIndex(
          (drink) => drink.name === currentDrink.name
        );
        if (missingIndex !== -1) {
          missingIngredients[missingIndex].ingredients.push(currentIng);
        } else {
          missingIngredients.push({
            name: currentDrink.name,
            ingredients: [currentIng],
          });
        }
      }
    }
    filteredData.push({
      name: currentDrink.name,
      ingredients: drinkIngredients,
    });
  }
  const addToFavorite = (drinkName: string) => {
    favoriteDrinks.includes(drinkName)
      ? setFavoriteDrinks([
          ...favoriteDrinks.filter((name) => name !== drinkName),
        ])
      : setFavoriteDrinks([...favoriteDrinks, drinkName]);
  };

  const selectFilter = (inputWithChoosenFilter: string) => {
    if (inputWithChoosenFilter === "alphabetically") {
      setData(data);
      setChoosenFilter("alphabetically");
    } else if (inputWithChoosenFilter === "inDescendingOrder") {
      setData(data);
      setChoosenFilter("inDescendingOrder");
    } else if (inputWithChoosenFilter === "crescively") {
      setData(data);
      setChoosenFilter("crescively");
    } else if (inputWithChoosenFilter === "searchedIngredient") {
      setChoosenFilter("searchedIngredient");
    } else if (inputWithChoosenFilter === "favoriteList") {
      setData(data);
      setChoosenFilter("favoriteList");
    } else {
      setData(data);
      setChoosenFilter("");
    }
  };

  const arrList = [];
  for (
    let drinkIndex = 0;
    drinkIndex < dataState.drinksList.length;
    drinkIndex++
  ) {
    const currentDrink: DrinkDetailsProps = dataState.drinksList[drinkIndex];
    if (
      currentDrink.composition.some(
        (drink) => drink.ingredient === selectedIngredient
      )
    ) {
      arrList.push(currentDrink);
    }
  }

  if (showFullList) {
    return (
      <Container className="drinkList-active tableOfDrinks">
        {drinkDetails.fullDrink ? (
          <RecipePane
            visible={drinkDetails.visible}
            name={drinkDetails.fullDrink.name}
            ingredients={drinkDetails.fullDrink.composition}
            photo={drinkDetails.fullDrink.photo}
            recipe={drinkDetails.fullDrink.recipe}
            closePanel={closeRecipePane}
            id={drinkDetails.id}
            addToFavorite={addToFavorite}
            isFavorite={favoriteDrinks.includes(drinkDetails.fullDrink.name)}
          />
        ) : (
          ""
        )}
        <div className="settingMenu">
          <div className="loading-buttons">
            <button
              className="btn btn-success me-2"
              onClick={() => showAllRecipes()}
            >
              Load recipes
            </button>
          </div>
          <div className="select__options-filter">
            {choosenFilter === "searchedIngredient" ? (
              <select
                className="form-select form-select-lg mb-3"
                aria-label=".form-select-lg example"
                onChange={(ingredient) =>
                  setSelectedIngredient(ingredient.target.value)
                }
              >
                {ingredientData.ingredientsList.map((iName, id) => {
                  return (
                    <option key={id} value={iName.label}>
                      {iName.label}
                    </option>
                  );
                })}
              </select>
            ) : (
              ""
            )}
            <select
              className="form-select form-select-lg mb-3"
              aria-label=".form-select-lg example"
              onChange={(dropboxValue) =>
                selectFilter(dropboxValue.target.value)
              }
            >
              <option value="">Choose Filter</option>
              <option value="alphabetically">Alphabetically</option>
              <option value="inDescendingOrder">In descending order</option>
              <option value="crescively">Crescively</option>
              <option value="searchedIngredient">Search Ingredient</option>
              <option value="favoriteList">Favorite List</option>
            </select>
          </div>
        </div>
        <Table variant="dark" bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Ratio</th>
              <th>Available / Not Available Ingredients</th>
              <th>Fav</th>
            </tr>
          </thead>
          <tbody className="cursor-pointer-active">
            {choosenFilter === "alphabetically"
              ? dataState.drinksList
                  .sort((a, b) =>
                    a.name > b.name ? 1 : b.name > a.name ? -1 : 0
                  )
                  .map((drink, id) => {
                    const filteredDrink: DrinkIngredientsProp =
                      filteredData.find(
                        (filteredDrink) => filteredDrink.name === drink.name
                      ) as DrinkIngredientsProp;
                    const missingIng: DrinkIngredientsProp =
                      missingIngredients.find(
                        (missingDrink) => missingDrink.name === drink.name
                      ) as DrinkIngredientsProp;
                    return (
                      <DrinkRow
                        key={id}
                        id={id}
                        currentDrink={drink}
                        currentDrinkLenght={drink.lenght}
                        drinkName={drink.name}
                        filteredDrinkLenght={filteredDrink.ingredients.length}
                        filteredDrinkIngredients={filteredDrink.ingredients}
                        missingIngredients={missingIng.ingredients}
                        showRecipe={showRecipe}
                        addToFavorite={addToFavorite}
                        isFavorite={favoriteDrinks.includes(drink.name)}
                      />
                    );
                  })
              : choosenFilter === "inDescendingOrder"
              ? dataState.drinksList
                  .sort((a, b) =>
                    a.composition.length < b.composition.length
                      ? 1
                      : b.composition.length < a.composition.length
                      ? -1
                      : 0
                  )
                  .map((drink, id) => {
                    const filteredDrink: DrinkIngredientsProp =
                      filteredData.find(
                        (filteredDrink) => filteredDrink.name === drink.name
                      ) as DrinkIngredientsProp;
                    const missingIng: DrinkIngredientsProp =
                      missingIngredients.find(
                        (missingDrink) => missingDrink.name === drink.name
                      ) as DrinkIngredientsProp;
                    return (
                      <DrinkRow
                        key={id}
                        id={id}
                        currentDrink={drink}
                        currentDrinkLenght={drink.lenght}
                        drinkName={drink.name}
                        filteredDrinkLenght={filteredDrink.ingredients.length}
                        filteredDrinkIngredients={filteredDrink.ingredients}
                        missingIngredients={missingIng.ingredients}
                        showRecipe={showRecipe}
                        addToFavorite={addToFavorite}
                        isFavorite={favoriteDrinks.includes(drink.name)}
                      />
                    );
                  })
              : choosenFilter === "crescively"
              ? dataState.drinksList
                  .sort((a, b) =>
                    a.composition.length > b.composition.length
                      ? 1
                      : b.composition.length > a.composition.length
                      ? -1
                      : 0
                  )
                  .map((drink, id) => {
                    const filteredDrink: DrinkIngredientsProp =
                      filteredData.find(
                        (filteredDrink) => filteredDrink.name === drink.name
                      ) as DrinkIngredientsProp;
                    const missingIng: DrinkIngredientsProp =
                      missingIngredients.find(
                        (missingDrink) => missingDrink.name === drink.name
                      ) as DrinkIngredientsProp;
                    return (
                      <DrinkRow
                        key={id}
                        id={id}
                        currentDrink={drink}
                        currentDrinkLenght={drink.lenght}
                        drinkName={drink.name}
                        filteredDrinkLenght={filteredDrink.ingredients.length}
                        filteredDrinkIngredients={filteredDrink.ingredients}
                        missingIngredients={missingIng.ingredients}
                        showRecipe={showRecipe}
                        addToFavorite={addToFavorite}
                        isFavorite={favoriteDrinks.includes(drink.name)}
                      />
                    );
                  })
              : choosenFilter === "searchedIngredient"
              ? arrList.map((drink, id) => {
                  const filteredDrink: DrinkIngredientsProp = filteredData.find(
                    (filteredDrink) => filteredDrink.name === drink.name
                  ) as DrinkIngredientsProp;
                  const missingIng: DrinkIngredientsProp =
                    missingIngredients.find(
                      (missingDrink) => missingDrink.name === drink.name
                    ) as DrinkIngredientsProp;
                  return (
                    <DrinkRow
                      key={id}
                      id={id}
                      currentDrink={drink}
                      currentDrinkLenght={drink.lenght}
                      drinkName={drink.name}
                      filteredDrinkLenght={filteredDrink.ingredients.length}
                      filteredDrinkIngredients={filteredDrink.ingredients}
                      missingIngredients={missingIng.ingredients}
                      showRecipe={showRecipe}
                      addToFavorite={addToFavorite}
                      isFavorite={favoriteDrinks.includes(drink.name)}
                    />
                  );
                })
              : choosenFilter === "favoriteList"
              ? dataState.drinksList
                  .filter((drink) => favoriteDrinks.includes(drink.name))
                  .map((drink, id) => {
                    const filteredDrink: DrinkIngredientsProp =
                      filteredData.find(
                        (filteredDrink) => filteredDrink.name === drink.name
                      ) as DrinkIngredientsProp;
                    const missingIng: DrinkIngredientsProp =
                      missingIngredients.find(
                        (missingDrink) => missingDrink.name === drink.name
                      ) as DrinkIngredientsProp;
                    return (
                      <DrinkRow
                        key={id}
                        id={id}
                        currentDrink={drink}
                        currentDrinkLenght={drink.lenght}
                        drinkName={drink.name}
                        filteredDrinkLenght={filteredDrink.ingredients.length}
                        filteredDrinkIngredients={filteredDrink.ingredients}
                        missingIngredients={missingIng.ingredients}
                        showRecipe={showRecipe}
                        addToFavorite={addToFavorite}
                        isFavorite={favoriteDrinks.includes(drink.name)}
                      />
                    );
                  })
              : dataState.drinksList.map((drink, id) => {
                  const filteredDrink: DrinkIngredientsProp = filteredData.find(
                    (filteredDrink) => filteredDrink.name === drink.name
                  ) as DrinkIngredientsProp;
                  const missingIng: DrinkIngredientsProp =
                    missingIngredients.find(
                      (missingDrink) => missingDrink.name === drink.name
                    ) as DrinkIngredientsProp;
                  return (
                    <DrinkRow
                      key={id}
                      id={id}
                      currentDrink={drink}
                      currentDrinkLenght={drink.lenght}
                      drinkName={drink.name}
                      filteredDrinkLenght={filteredDrink.ingredients.length}
                      filteredDrinkIngredients={filteredDrink.ingredients}
                      missingIngredients={missingIng.ingredients}
                      showRecipe={showRecipe}
                      addToFavorite={addToFavorite}
                      isFavorite={favoriteDrinks.includes(drink.name)}
                    />
                  );
                })}
          </tbody>
        </Table>
      </Container>
    );
  } else {
    return (
      <Container className="margining">
        <div className="settingMenu">
          <div className="loading-buttons">
            <button
              className="btn btn-success me-2"
              onClick={() => showAllRecipes()}
            >
              Load recipes
            </button>
          </div>
          <div className="select__options-filter">
            {choosenFilter === "searchedIngredient" ? (
              <select
                className="form-select form-select-lg mb-3"
                aria-label=".form-select-lg example"
                onChange={(ingredient) =>
                  setSelectedIngredient(ingredient.target.value)
                }
              >
                {ingredientData.ingredientsList.map((iName, id) => {
                  return (
                    <option key={id} value={iName.label}>
                      {iName.label}
                    </option>
                  );
                })}
              </select>
            ) : (
              ""
            )}
            <select
              className="form-select form-select-lg mb-3"
              aria-label=".form-select-lg example"
              onChange={(e) => selectFilter(e.target.value)}
            >
              <option value="">Choose Filter</option>
              <option value="alphabetically">Alphabetically</option>
              <option value="inDescendingOrder">In descending order</option>
              <option value="crescively">Crescively</option>
              <option value="searchedIngredient">Search Ingredient</option>
              <option value="favoriteList">Favorite List</option>
            </select>
          </div>
        </div>
      </Container>
    );
  }
};

export default connect(
  (state: ApplicationState) => ({
    ingredients: state.ingredients.ingredientsList,
  }),
  {}
)(DrinkList);
