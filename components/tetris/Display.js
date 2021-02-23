import React from "react";

const Display = ({ gameOver, text }) => (
  <>
    <div className="display">{text}</div>
    <style jsx>{`
      .display {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        margin: 0 0 20px 0;
        padding: 20px;
        border: 4px solid #333;
        min-height: 30px;
        width: 100%;
        border-radius: 20px;
        color: ${gameOver ? "red" : "#999"};
        background: #000;
        font-family: Pixel, Arial, Helvetica, sans-serif;
        font-size: 0.8rem;
      }
    `}</style>
  </>
);

export default Display;
