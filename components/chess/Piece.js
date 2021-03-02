import Image from "next/image";

function Piece({ getMovements, piece }) {
  return (
    <button
      style={{ border: "none", backgroundColor: "inherit" }}
      onClick={() => getMovements(piece)}
    >
      <Image
        src={`/chesspieces/${piece.team}${piece.type}.png`}
        alt={`${piece.team} ${piece.type}`}
        className="Piece"
        width={40}
        height={40}
      />
      <style jsx>{`
        button {
          height: 100%;
          width: 100%;
        }
        button:hover {
          cursor: pointer;
        }

        .Piece {
          max-width: 40px;
          max-height: 40px;
        }
      `}</style>
    </button>
  );
}

export default Piece;
