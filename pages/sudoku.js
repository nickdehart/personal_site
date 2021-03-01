import React from "react";
import _ from "lodash";
import Puzzle from "../components/Puzzle";

function Sudoku() {
  const HARD = [
    [8, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 3, 6, 0, 0, 0, 0, 0],
    [0, 7, 0, 0, 9, 0, 2, 0, 0],
    [0, 5, 0, 0, 0, 7, 0, 0, 0],
    [0, 0, 0, 0, 4, 5, 7, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 3, 0],
    [0, 0, 1, 0, 0, 0, 0, 6, 8],
    [0, 0, 8, 5, 0, 0, 0, 1, 0],
    [0, 9, 0, 0, 0, 0, 4, 0, 0]
  ];
  const [puzzle, setPuzzle] = React.useState([]);
  const [puzzleWorking, setPuzzleWorking] = React.useState([]);
  const [puzzleSolved, setPuzzleSolved] = React.useState([]);

  React.useEffect(() => {
    getPuzzle();
  }, []);

  const getPuzzle = () => {
    let puzzle = [];
    for (let x = 0; x < 9; x++) {
      puzzle.push([]);
      for (let y = 0; y < 9; y++) puzzle[x].push(0);
    }
    fetch("/api/getPuzzle")
      .then(response => response.json())
      .then(data => {
        for (const i in data.squares)
          puzzle[data.squares[i].x][data.squares[i].y] = data.squares[i].value;
        setPuzzle(puzzle);
        setPuzzleWorking(_.cloneDeep(puzzle));
        let solved = _.cloneDeep(puzzle);
        solve(solved);
        setPuzzleSolved(solved);
      });
  };

  const valid = (board, x, y, val) => {
    for (let i = 0; i < 9; i++) {
      const m = 3 * Math.floor(x / 3) + Math.floor(i / 3);
      const n = 3 * Math.floor(y / 3) + (i % 3);
      if (board[x][i] === val || board[i][y] === val || board[m][n] === val)
        return false;
    }
    return true;
  };

  const solve = board => {
    for (let x = 0; x < 9; x++)
      for (let y = 0; y < 9; y++)
        if (!board[x][y]) {
          for (let val = 1; val <= 9; val++)
            if (valid(board, x, y, val)) {
              board[x][y] = val;
              if (solve(board)) return true;
              board[x][y] = 0;
            }
          return false;
        }
    return true;
  };

  const restart = () => {
    setPuzzleWorking(puzzle);
  };

  const hint = () => {
    let hint = 0;
    let row = 0;
    let col = 0;
    while (hint < 1) {
      let randRow = Math.floor(Math.random() * Math.floor(9));
      for (let y = 0; y < 9; y++) {
        if (puzzleWorking[randRow][y] === 0) {
          hint = puzzleSolved[randRow][y];
          row = randRow;
          col = y;
          break;
        }
      }
    }
    let alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    window.alert(`Row: ${row + 1}, Column: ${alpha[col]}, Value: ${hint}`);
  };

  const solvePuzzle = () => {
    setPuzzleWorking(puzzleSolved);
  };

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src="/logo.svg" className="App-logo" alt="logo" />
        <b>React Sudoku</b>
      </header> */}
      {puzzle && (
        <Puzzle
          puzzleOrig={puzzle}
          puzzleWorking={puzzleWorking}
          setPuzzleWorking={setPuzzleWorking}
        />
      )}
      <div>
        <button onClick={restart}>Restart</button>
        <button onClick={hint}>Hint</button>
        {/* <button>Error Check</button> */}
        <button onClick={solvePuzzle}>Solve</button>
      </div>
      <style jsx>{`
        .App {
          text-align: center;
          height: 100%;
        }

        button {
          margin: 20px 10px 0px 10px;
          padding: 5px 15px 5px 15px;
        }
      `}</style>
    </div>
  );
}

export default Sudoku;
