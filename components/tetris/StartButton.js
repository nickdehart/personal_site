import React from "react";

const StartButton = ({ callback }) => (
  <>
    <button className="start-button" onClick={callback}>
      Start Game
    </button>
    <style jsx>{`
      .start-button {
        box-sizing: border-box;
        margin: 0 0 20px 0;
        padding: 20px;
        min-height: 30px;
        width: 100%;
        border-radius: 20px;
        border: none;
        color: white;
        background: #333;
        font-family: Pixel, Arial, Helvetica, sans-serif;
        font-size: 1rem;
        outline: none;
        cursor: pointer;
      }
    `}</style>
  </>
);

export default StartButton;
