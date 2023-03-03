/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "../../styles/IngredientList.css";
import { UpdateValue } from "./UpdateIngredientVolume";
import { IngredientRowProps } from "../../store/types/types";

export const IngredientRow = ({
  id,
  ingredient,
  removeFromStore,
  changeValueOfSingleIngr,
  cancelChanging,
  updateValueChange,
  changeValue,
  setChangeValue,
}: IngredientRowProps) => {
  return (
    <tr key={id}>
      <td>{id + 1}</td>
      <td>{ingredient.label}</td>
      <td key={ingredient.id}>
        {changeValue && changeValue && ingredient.id == changeValue.id ? (
          <UpdateValue
            changeValueOfSingleIngr={changeValueOfSingleIngr}
            updateValueChange={updateValueChange}
            cancelChanging={cancelChanging}
            changeValue={changeValue}
          />
        ) : (
          <div className="iconsWrap">
            {ingredient.volume}
            {ingredient.unit}
            <span
              title="Edit"
              onClick={(ingredientVolume) =>
                setChangeValue({
                  id: ingredient.id,
                  volume: parseFloat(
                    (ingredientVolume.target as HTMLInputElement).value
                  ),
                })
              }
            >
              <FontAwesomeIcon icon={faPen} />
            </span>
          </div>
        )}
      </td>
      <td className="span1">
        <div className="iconsWrap">
          <span title="Delete" onClick={() => removeFromStore(id)}>
            <FontAwesomeIcon icon={faTrashCan} />
          </span>
        </div>
      </td>
    </tr>
  );
};
