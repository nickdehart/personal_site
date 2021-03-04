import React from "react";

function Mine({ bomb, num, gameover, setGameover }) {
  const [state, setState] = React.useState("covered");
  // 3 possible states
  // covered - a cell that may or may not be a mine
  // flagged - a cell the player flags as a possible mine
  // revealed - a cell that has been revealed to be a mine or not

  React.useEffect(() => {
    if (!gameover) setState("covered");
  }, [gameover]);

  const handleLeftClick = () => {
    if (state === "covered") {
      setState("revealed");
      if (bomb === 1 && gameover === false) {
        window.alert("Game Over");
        setGameover(true);
      }
    } else if (state === "flagged")
      window.alert("Flagged cells cannot be revealed. Unflag them first.");
  };

  const handleRightClick = e => {
    e.preventDefault();
    if (state === "covered") setState("flagged");
    else if (state === "flagged") setState("covered");
  };

  return (
    <button onClick={handleLeftClick} onContextMenu={handleRightClick}>
      {state === "flagged" ? (
        <>&#128681;</>
      ) : (
        state === "revealed" && <>{bomb === 1 ? <>&#128165;</> : num}</>
      )}

      <style jsx>{`
        button {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          cursor: pointer;
          border-radius: 0;
          border: 1px solid black;
          display: flex;
          align-items: center;
          justify-content: center;

          color: ${state === "revealed"
            ? bomb === 1
              ? "red"
              : num === 1
              ? "blue"
              : num === 2
              ? "green"
              : num === 3
              ? "red"
              : num === 4
              ? "darkblue"
              : num === 5
              ? "sienna"
              : num === 6
              ? "cyan"
              : num === 7
              ? "black"
              : "grey"
            : "-internal-light-dark(buttontext, rgb(170, 170, 170))"};
          background-color: ${state === "revealed"
            ? "white"
            : "-internal-light-dark(rgb(239, 239, 239), rgb(74, 74, 74))"};
        }
      `}</style>
    </button>
  );
}

export default Mine;
