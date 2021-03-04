import React from "react";
import Mine from "./Mine";

function MineBoard() {
  const [board, setBoard] = React.useState([]);
  const [gameover, setGameover] = React.useState(false);
  React.useEffect(() => {
    setup();
  }, []);

  const setup = () => {
    let b = [];
    let numMines = 0;
    while (numMines < 40) {
      for (let row = 0; row < 15; row++) {
        b.push([]);
        for (let col = 0; col < 13; col++) {
          let isBomb = Math.floor(Math.random() * 10);
          if (b[row][col]) continue;
          else if (isBomb < 2) {
            if (b[row][col] === 0) {
              b[row][col] = 1;
              numMines++;
            } else {
              b[row].push(1);
              numMines++;
            }
          } else if (b[row][col] === undefined) b[row].push(0);
        }
      }
    }
    setBoard(b);
  };

  const getNumber = (x, y) => {
    let num = 0;
    try {
      if (board[x - 1][y - 1] === 1) num++;
    } catch {}
    try {
      if (board[x][y - 1] === 1) num++;
    } catch {}
    try {
      if (board[x + 1][y - 1] === 1) num++;
    } catch {}
    try {
      if (board[x - 1][y] === 1) num++;
    } catch {}
    try {
      if (board[x + 1][y] === 1) num++;
    } catch {}
    try {
      if (board[x - 1][y + 1] === 1) num++;
    } catch {}
    try {
      if (board[x][y + 1] === 1) num++;
    } catch {}
    try {
      if (board[x + 1][y + 1] === 1) num++;
    } catch {}
    return num;
  };

  return (
    <div className="minesweeper">
      <table>
        <tbody>
          {board.length > 0 &&
            board.map((row, rowIndex) => (
              <tr key={`minesweeper-row-${rowIndex}`}>
                {row.map((col, colIndex) => (
                  <td key={`minesweeper-col-${colIndex}`}>
                    <Mine
                      bomb={col}
                      num={getNumber(rowIndex, colIndex)}
                      gameover={gameover}
                      setGameover={setGameover}
                    />
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
      <button
        onClick={() => {
          setup();
          setGameover(false);
        }}
      >
        Restart
      </button>
      <style jsx>{`
        .minesweeper {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }

        table {
          border-spacing: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          padding-bottom: 10px;
        }

        tr {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        td {
          width: 25px;
          height: 25px;
        }
      `}</style>
    </div>
  );
}

export default MineBoard;
