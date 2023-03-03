/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { connect } from "react-redux";
import { addIngredient } from "../../store/redux/actions/actions";
import data from "../../store/dataSource/ingredients.json";
import { Container } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import "bootstrap/dist/css/bootstrap.css";
import "../../styles/Dashboard.css";
import { ApplicationState } from "../../store/redux/rootReducers";
import { Ingredient } from "../../store/types/types";

type StateProps = {
  ingredients: Ingredient[];
};

type DispatchProps = {
  addIngredient: typeof addIngredient;
};

type Props = StateProps & DispatchProps;

let nextArrayId = 0;

const IngredientsSearchBar = ({ ingredients, addIngredient }: Props) => {
  const [selectedItem] = useState([]);
  const [dataIngredient] = useState(data);
  // const addSingleIngredient = () => (selectedValue: SelectedItem) => {
  //   if (
  //     ingredients.every((ingredient) => {
  //       return ingredient.label !== selectedValue.label;
  //     })
  //   ) {
  //     addIngredient({
  //       id: nextArrayId++,
  //       label: selectedValue.label,
  //       unit: selectedValue.unit,
  //       volume: 0,
  //     });
  //   }
  // };

  return (
    <Container className="xd">
      <Typeahead
        className="typehead form-control"
        id="basic-example"
        onChange={(selectedValue) => {
          if (
            ingredients.every((ingredient) => {
              return ingredient.label !== selectedValue[0].label;
            })
          ) {
            addIngredient({
              id: nextArrayId++,
              label: selectedValue[0].label,
              unit: selectedValue[0].unit,
              volume: 0,
            });
          }
        }}
        options={dataIngredient.ingredientsList}
        placeholder="Enter ingredients!"
        selected={selectedItem}
      />
    </Container>
  );
};

export default connect(
  (state: ApplicationState) => ({
    ingredients: state.ingredients.ingredientsList,
  }),
  {
    addIngredient: addIngredient,
  }
)(IngredientsSearchBar);
