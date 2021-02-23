import React from "react";
import { TETROMINOS } from "../../helpers/tetris/tetrominos";

const Cell = ({ type }) => (
  <>
    <div className="cell"></div>
    <style jsx>{`
      .cell {
        width: auto;
        background: rgb(${TETROMINOS[type].color}, 0.8);
        border: ${type === 0 ? "0px" : "4px solid"};
        border-bottom-color: rgb(${TETROMINOS[type].color}, 0.1);
        border-right-color: rgb(${TETROMINOS[type].color}, 1);
        border-top-color: rgb(${TETROMINOS[type].color}, 1);
        border-left-color: rgb(${TETROMINOS[type].color}, 0.3);
      }
    `}</style>
  </>
);

export default React.memo(Cell);
