import React from "react";
import _ from "lodash";
import Image from "next/image";
import Piece from "./Piece";
import setup from "../../helpers/chess/setup";
import pawn from "../../helpers/chess/pawn";
import rook from "../../helpers/chess/rook";
import bishop from "../../helpers/chess/bishop";
import queen from "../../helpers/chess/queen";
import knight from "../../helpers/chess/knight";
import king from "../../helpers/chess/king";
// import getBestMove from "../../helpers/chess/ai";

function Board() {
  const [board, setBoard] = React.useState([]);
  const [turn, setTurn] = React.useState("w");
  const [active, setActive] = React.useState(null);
  const [lost, setLost] = React.useState({ b: [], w: [] });
  const [gameOver, setGameOver] = React.useState(false);

  // Uncomment for AI, but it is very janky
  // React.useEffect(() => {
  //   if (turn === "b" && !gameOver) {
  //     try {
  //       let bestMove = getBestMove(_.cloneDeep(board), 10);
  //       // console.log(bestMove);
  //       let source = board[bestMove[0].x][bestMove[0].y];
  //       let target = board[bestMove[1].x][bestMove[1].y];

  //       if (target.type === "K") setGameOver(true);
  //       if (board[target.x][target.y].type)
  //         lost[board[target.x][target.y].team].push({ ...target });
  //       board[target.x][target.y].type = source.type;
  //       board[target.x][target.y].team = source.team;
  //       board[source.x][source.y].type = null;
  //       board[source.x][source.y].team = null;
  //       setBoard(board);
  //       setLost(lost);
  //       setTurn("w");
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // }, [turn, board, lost, gameOver]);

  React.useEffect(() => {
    setBoard(setup());
  }, []);

  const getMovements = piece => {
    if (piece.team !== turn || gameOver) return;

    let movements = [];
    switch (piece.type) {
      case "P":
        movements = pawn(piece, board);
        break;
      case "R":
        movements = rook(piece, board);
        break;
      case "B":
        movements = bishop(piece, board);
        break;
      case "Q":
        movements = queen(piece, board);
        break;
      case "N":
        movements = knight(piece, board);
        break;
      default:
        movements = king(piece, board);
    }
    // console.log(movements);
    for (let x in board) for (let y in board[x]) board[x][y].active = false;
    for (let i = 0; i < movements.length; i++) {
      board[movements[i].x][movements[i].y].active = true;
    }
    setBoard(board);
    setActive(piece);
  };

  const handleMove = target => {
    if (target.type === "K") setGameOver(true);
    if (board[target.x][target.y].type)
      lost[board[target.x][target.y].team].push({ ...target });
    board[target.x][target.y].type = active.type;
    board[target.x][target.y].team = active.team;
    board[active.x][active.y].type = null;
    board[active.x][active.y].team = null;
    for (let x in board) for (let y in board[x]) board[x][y].active = false;
    setBoard(board);
    setActive(null);
    setLost(lost);
    if (turn === "w") setTurn("b");
    else setTurn("w");
  };

  return (
    <div className="game-container">
      {gameOver && (
        <div
          style={{
            position: "absolute",
            borderRadius: "10% 10%",
            border: "3px solid",
            backgroundColor: "white",
            padding: "20px 60px 20px 60px",
            transform: "translate(100%, 100%)",
            zIndex: 1
          }}
        >
          <h1>GAME OVER</h1>
          <h4>{turn === "w" ? "Black" : "White"} Team Wins!</h4>
        </div>
      )}
      <div className="lost-pieces">
        {lost.w.map((item, index) => (
          <Image
            key={`w-lost-${index}`}
            src={`/chesspieces/${item.team}${item.type}.png`}
            alt={`${item.team} ${item.type}`}
            width={30}
            height={30}
          />
        ))}
      </div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>A</th>
            <th>B</th>
            <th>C</th>
            <th>D</th>
            <th>E</th>
            <th>F</th>
            <th>G</th>
            <th>H</th>
          </tr>
        </thead>
        <tbody>
          {board.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              <td>
                <b>{rowIndex + 1}</b>
              </td>
              {row.map((col, colIndex) => {
                let modifier = rowIndex % 2 === 0 ? 1 : 0;
                let background = colIndex % 2 === modifier ? "#61dafb" : "#fff";
                return (
                  <td
                    className="piece-cell"
                    key={`col-${colIndex}`}
                    onClick={col.active ? () => handleMove(col) : () => {}}
                    style={{
                      backgroundColor: background,
                      border: col.active
                        ? "1px solid red"
                        : "1px solid transparent"
                    }}
                  >
                    {col.type && (
                      <Piece
                        board={board}
                        getMovements={getMovements}
                        piece={col}
                      />
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="lost-pieces">
        {lost.b.map((item, index) => (
          <Image
            key={`b-lost-${index}`}
            src={`/chesspieces/${item.team}${item.type}.png`}
            alt={`${item.team} ${item.type}`}
            width={30}
            height={30}
          />
        ))}
      </div>
      <style jsx>{`
      .game-container {
        min-width: 90%,
        display: flex,
        flex-direction: row,
        justify-content: space-between,
        align-items: flex-start
      }
      .lost-pieces {
        width: 20%;
      }
      @media only screen and (max-width: 600px) {
        .game-container {
          flex-direction: column;
        }
        .lost-pieces {
          width: 100%;
          height: 100px;
        }
      }
        .piece-cell {
          max-width: 50px;
          max-height: 50px;
          width: 50px;
          height: 50px;
          text-align: left;
        }
      `}</style>
    </div>
  );
}

export default Board;
