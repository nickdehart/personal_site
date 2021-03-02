import Board from "../components/chess/Board";

function Chess() {
  return (
    <div className="App">
      <div className="board-wrapper">
        <Board />
      </div>
      <style jsx>{`
        .board-wrapper {
          max-width: 100vw;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
}

export default Chess;
