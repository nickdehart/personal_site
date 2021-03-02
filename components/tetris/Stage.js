import Cell from "./Cell";

const Stage = ({ stage }) => (
  <div className="stage">
    {stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
    <style jsx>{`
      .stage {
        display: grid;
        grid-template-rows: repeat(
          ${stage.length},
          calc(25vw / ${stage[0].length})
        );
        grid-template-columns: repeat(${stage[0].length}, 1fr);
        grid-gap: 1px;
        border: 2px solid #333;
        width: 100%;
        max-width: 25vw;
        background: #111;
      }

      @media only screen and (max-width: 600px) {
        .stage {
          grid-template-rows: repeat(
            ${stage.length},
            calc(75vw / ${stage[0].length})
          );
          max-width: 75vw;
        }
      }
    `}</style>
  </div>
);

export default Stage;
