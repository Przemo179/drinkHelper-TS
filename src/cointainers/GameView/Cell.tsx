import { CellProps } from "../../store/types/types";

export const Cell = ({
  cellIndex,
  isSwitchedOn,
  updateGameGrid,
}: CellProps) => (
  <button
    className={isSwitchedOn ? "cell-on" : "cell-off"}
    onClick={() => updateGameGrid(cellIndex)}
  ></button>
);
