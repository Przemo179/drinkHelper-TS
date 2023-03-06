import { useState } from "react";
import {
  removeIngredient,
  updateVolume,
} from "../../store/redux/actions/actions";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import { Container } from "react-bootstrap";
import "../../styles/IngredientList.css";
import { ChangeValueProps, Ingredient } from "../../store/types/types";
import { IngredientRow } from "../../cointainers/IngredientsLists/IngredientsRow";
import { ApplicationState } from "../../store/redux/rootReducers";

type StateProps = {
  ingredients: Ingredient[];
};

type DispatchProps = {
  removeIngredient: typeof removeIngredient;
  updateVolume: typeof updateVolume;
};

type Props = StateProps & DispatchProps;

const initChangeValue = {
  id: -1,
  volume: 0,
};

const ProductsList = ({
  ingredients,
  removeIngredient,
  updateVolume,
}: Props) => {
  const [changeValue, setChangeValue] =
    useState<ChangeValueProps>(initChangeValue);

  const removeFromStore = (id: number) => {
    removeIngredient({
      id: id,
      label: "",
      unit: "",
      volume: 0,
    });
  };

  const changeValueOfSingleIngr = (inputValue: number) => {
    if (inputValue <= 1000) {
      setChangeValue({
        id: changeValue.id,
        volume: inputValue,
      });
    }
  };

  const cancelChanging = () => {
    setChangeValue(initChangeValue);
  };

  const updateValueChange = () => {
    if (changeValue.volume === undefined) {
      setChangeValue(initChangeValue);
    } else {
      updateVolume({
        id: changeValue.id,
        label: "",
        unit: "",
        volume: changeValue.volume,
      });
    }
    setChangeValue(initChangeValue);
  };

  if (ingredients[0] !== undefined) {
    return (
      <Container className="tableOfIng">
        <Table variant="dark" bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Volume</th>
              <th>Del</th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map((ingredient, id) => (
              <IngredientRow
                key={id}
                id={id}
                ingredient={ingredient}
                removeFromStore={removeFromStore}
                setChangeValue={setChangeValue}
                changeValue={changeValue}
                changeValueOfSingleIngr={changeValueOfSingleIngr}
                cancelChanging={cancelChanging}
                updateValueChange={updateValueChange}
              />
            ))}
          </tbody>
        </Table>
      </Container>
    );
  }
  return (
    <div>
      <h1 className="empty-list-information">Your ingredient list is empty!</h1>
    </div>
  );
};

export default connect(
  (state: ApplicationState) => ({
    ingredients: state.ingredients.ingredientsList,
  }),
  {
    removeIngredient: removeIngredient,
    updateVolume: updateVolume,
  }
)(ProductsList);
