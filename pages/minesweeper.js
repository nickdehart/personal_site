import React from "react";
import Mines from "../components/minesweeper/Mines";

function Minesweeper() {
  return (
    <div className="App">
      <Mines />
      {/* <div>
        <button onClick={restart}>Restart</button>
        <button onClick={hint}>Hint</button>
      </div> */}
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

export default Minesweeper;
