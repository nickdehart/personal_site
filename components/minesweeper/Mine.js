import React from "react";

function Mine({ bomb, num }) {
  const [state, setState] = React.useState("covered");
  // 3 possible states
  // covered - a cell that may or may not be a mine
  // flagged - a cell the player flags as a possible mine
  // revealed - a cell that has been revealed to be a mine or not

  const handleLeftClick = () => {
    if (state === "covered") {
      if (bomb === 1) {
        window.alert("Game Over");
      }
      setState("revealed");
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        state === "revealed" && (
          <>
            {bomb === 1 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              num
            )}
          </>
        )
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
