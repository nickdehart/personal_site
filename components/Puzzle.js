import React from "react";

function Puzzle({ puzzleOrig, puzzleWorking, setPuzzleWorking }) {
  const [active, setActive] = React.useState(0);

  const makeEdit = (e, row, col) => {
    let val = parseInt(e.target.value);
    puzzleWorking[row][col] = val;
    setPuzzleWorking(puzzleWorking);
    setActive(val);
  };

  const handleHover = val => {
    if (val > 0) setActive(val);
  };

  return (
    <div className="puzzle-table">
      <table>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>A</th>
            <th>B</th>
            <th>C</th>
            <th></th>
            <th>D</th>
            <th>E</th>
            <th>F</th>
            <th></th>
            <th>G</th>
            <th>H</th>
            <th>I</th>
          </tr>
        </thead>
        <tbody>
          {puzzleWorking.map((row, rowIndex) => (
            <React.Fragment key={`row-${rowIndex}`}>
              {rowIndex % 3 === 0 && (
                <tr>
                  <td></td>
                </tr>
              )}
              <tr
                style={{
                  borderTop:
                    rowIndex % 3 === 0 && rowIndex > 0 && "1px solid gray"
                }}
              >
                <td>
                  <b>{rowIndex + 1}</b>
                </td>
                {/* <td></td> */}
                {row.map((column, colIndex) => (
                  <React.Fragment key={`col-${colIndex}`}>
                    {colIndex % 3 === 0 && <td></td>}
                    <td
                      onMouseOver={() => handleHover(column)}
                      style={{
                        // paddingTop: rowIndex % 3 === 0 ? "35px" : "5px",
                        // paddingLeft: colIndex % 3 === 0 ? "45px" : "5px",
                        border: "1px solid black"
                      }}
                    >
                      {puzzleOrig[rowIndex][colIndex] ? (
                        <div
                          className="num-div"
                          style={{
                            backgroundColor:
                              column > 0 && column === active && "#9ecaed"
                          }}
                        >
                          <b>{column}</b>
                        </div>
                      ) : (
                        <input
                          type="number"
                          value={column > 0 ? column : ""}
                          onChange={e => makeEdit(e, rowIndex, colIndex)}
                          style={{
                            backgroundColor:
                              column > 0 && column === active && "#9ecaed"
                          }}
                          min="1"
                          max="9"
                        />
                      )}
                    </td>
                  </React.Fragment>
                ))}
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <style jsx>{`
        input {
          width: 100%;
          height: 100%;
          text-align: center;
          background: transparent;
          border: none;
          border-bottom: 1px solid gray;
          /* border-radius: 3px; */
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          /* display: none; <- Crashes Chrome on hover */
          -webkit-appearance: none;
          margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
        }

        input[type="number"] {
          -moz-appearance: textfield; /* Firefox */
        }

        .num-div {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .puzzle-table {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }

        table {
          padding-right: 60px;
        }

        td {
          vertical-align: bottom;
          width: 30px;
          height: 30px;
        }

        .table-heading {
          text-align: end;
          padding-right: 17px;
        }
      `}</style>
    </div>
  );
}

export default Puzzle;
