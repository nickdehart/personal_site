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

function Board() {
  const [board, setBoard] = React.useState([]);
  const [turn, setTurn] = React.useState("w");
  const [moves, setMoves] = React.useState("");
  const [active, setActive] = React.useState(null);
  const [lost, setLost] = React.useState({ b: [], w: [] });
  const [gameOver, setGameOver] = React.useState(false);
  const lookupX = {
    0: 7,
    1: 6,
    2: 5,
    3: 4,
    4: 3,
    5: 2,
    6: 1,
    7: 0
  };
  const lookupY = {
    a: "0",
    b: "1",
    c: "2",
    d: "3",
    e: "4",
    f: "5",
    g: "6",
    h: "7",
    "0": "a",
    "1": "b",
    "2": "c",
    "3": "d",
    "4": "e",
    "5": "f",
    "6": "g",
    "7": "h"
  };

  React.useEffect(() => {
    if (turn === "b" && !gameOver) {
      fetch("/api/getBestMove", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          moves: moves
        })
      })
        .then(response => response.json())
        .then(data => {
          let best = data.bestNext;
          let source = board[lookupX[parseInt(best[1]) - 1]][lookupY[best[0]]];
          let target = board[lookupX[parseInt(best[3]) - 1]][lookupY[best[2]]];
          if (target.type === "K") setGameOver(true);
          if (board[target.x][target.y].type)
            lost[board[target.x][target.y].team].push({ ...target });
          board[target.x][target.y].type = source.type;
          board[target.x][target.y].team = source.team;
          board[source.x][source.y].type = null;
          board[source.x][source.y].team = null;
          setBoard(board);
          setLost(lost);
          setTurn("w");
          setMoves(`${moves}${best}`);
        })
        .catch(error => console.error(error));
    }
  }, [turn, board, lost, gameOver]);

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
    setMoves(
      `${moves}${lookupY[active.y]}${lookupX[active.x] + 1}${
        lookupY[target.y]
      }${lookupX[target.x] + 1}`
    );
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
