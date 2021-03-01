import React from "react";
import Board from "../components/chess/Board";

function Chess() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src="/logo.svg" className="App-logo" alt="logo" />
        <b>React Chess</b>
      </header> */}
      <div
        style={{
          maxWidth: "100vw",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Board />
      </div>
      <style jsx>{`
        .App {
          text-align: center;
          height: 100%;
        }
      `}</style>
    </div>
  );
}

export default Chess;
