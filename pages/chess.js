import React from "react";
import Board from "../components/chess/Board";

function Chess() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="/logo.svg" className="App-logo" alt="logo" />
        <b>React Chess</b>
      </header>
      <div
        style={{
          width: "100%",
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
          height: 90vh;
        }

        .App-logo {
          height: 10vmin;
          pointer-events: none;
        }

        @media (prefers-reduced-motion: no-preference) {
          .App-logo {
            animation: App-logo-spin infinite 20s linear;
          }
        }

        .App-header {
          background-color: #282c34;
          min-height: 10vh;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          font-size: calc(10px + 2vmin);
          color: white;
        }

        @keyframes App-logo-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

export default Chess;
