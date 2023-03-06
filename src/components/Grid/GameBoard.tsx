/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import "../../styles/Game.css";
import { Cell } from "../../cointainers/GameView/Cell";
import "../../styles/Game.css";
import { GameProps } from "../../store/types/types";

const GameBoard = (props: GameProps) => {
  const { boardSize, percentForLightsOn } = props;

  const randomLight = () => {
    return Math.random() < percentForLightsOn;
  };

  const gameGrid = Array.from({ length: boardSize }).map(
    (row) =>
      (row = Array.from({ length: boardSize }).map(
        (cell) => (cell = randomLight())
      ))
  );

  const [board, setBoard] = useState({ grid: gameGrid });

  const toggleLight = (cellIndex: string) => {
    const [cellRowIndex, cellColIndex] = cellIndex.split("");

    setBoard((currSt) => ({
      ...currSt,
      grid: currSt.grid.map((row, rowIndex) =>
        rowIndex === parseInt(cellRowIndex)
          ? row.map((col, colIndex) =>
              colIndex === parseInt(cellColIndex) ? !col : col
            )
          : row
      ),
    }));
  };

  const updateGameGrid = (cellIndex: string) => {
    const [cellRowIndex, cellColIndex] = cellIndex.split("");

    toggleLight(cellIndex);
    toggleLight([parseInt(cellRowIndex), parseInt(cellColIndex) + 1].join(""));
    toggleLight([parseInt(cellRowIndex), parseInt(cellColIndex) - 1].join(""));
    toggleLight([parseInt(cellRowIndex) + 1, parseInt(cellColIndex)].join(""));
    toggleLight([parseInt(cellRowIndex) - 1, parseInt(cellColIndex)].join(""));
  };

  const hasWon = () => {
    return board.grid.every((row) => row.every((col) => !col));
  };

  const display = board.grid.map((row, rowIndex) => {
    return (
      <div key={rowIndex}>
        <div className="board-row">
          {row.map((col, colIndex) => (
            <Cell
              key={[rowIndex, colIndex].join("")}
              cellIndex={[rowIndex, colIndex].join("")}
              isSwitchedOn={board.grid[rowIndex][colIndex]}
              updateGameGrid={updateGameGrid}
            />
          ))}
        </div>
      </div>
    );
  });

  return (
    <div>
      {hasWon() ? <div className="board-hasWon">Congratulations</div> : display}
    </div>
  );
};

export default GameBoard;
