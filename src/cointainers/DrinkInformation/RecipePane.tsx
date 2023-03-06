import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import "../../styles/RecipePane.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { BsCaretLeft } from "react-icons/bs";
import { RecipePaneProps } from "../../store/types/types";

const RecipePane = ({
  visible,
  name,
  ingredients,
  photo,
  recipe,
  closePanel,
  id,
  addToFavorite,
  isFavorite,
}: RecipePaneProps) => {
  return (
    <SlidingPane
      className="sliding-pane wrapper-recipePane"
      isOpen={visible}
      title={name ? name : "did not catch title :("}
      width={window.innerWidth < 600 ? "100%" : "500px"}
      onRequestClose={closePanel}
      hideHeader
      key={id}
    >
      <div className="recipeDetails">
        <div>
          <div className="drinkHeadline">
            <a> {name} </a>
            <div className="drinkHeadline__favorite__drink">
              <span
                className={
                  isFavorite
                    ? "drinkHeadline__favorite__drink--True"
                    : "drinkHeadline__favorite__drink--False"
                }
                title="Add to favorite"
                onClick={() => addToFavorite(name)}
              >
                <FontAwesomeIcon icon={faStar} />
              </span>
              <br />
            </div>
          </div>
        </div>
        <div className="recipeDetails__photo">
          <img src={photo ? photo : "there is not photo"} alt={name} />
        </div>
        <div>
          <div>
            <a onClick={closePanel} className="recipeDetails--close">
              <BsCaretLeft />
              CLOSE
            </a>
            <div className="recipeDetails__ingredients">
              <a>Required ingredients:</a>
              {ingredients
                ? ingredients.map((ingredient, id) => {
                    return (
                      <>
                        <p>
                          {id +
                            1 +
                            ". " +
                            ingredient.ingredient +
                            " - " +
                            (ingredient.volume > 1
                              ? ingredient.volume + ingredient.unit
                              : "At Choice")}
                        </p>
                        <br />
                      </>
                    );
                  })
                : ""}
            </div>
            <div className="recipeDetails__order">
              <a>Recipe</a>
              <br />
              {recipe
                ? recipe.map((step, id) => {
                    return (
                      <div key={id} className="recipeDetails__order__steps">
                        <p>{"Step " + (id + 1) + ". "}</p>
                        <span />
                        <p>{step}</p>
                        <br />
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>
        </div>
      </div>
    </SlidingPane>
  );
};

export default RecipePane;
