import React, { useState } from "react";
import { createStage, checkCollision } from "../helpers/tetris/gameHelpers";

// Custom Hooks
import { useInterval } from "../hooks/tetris/useInterval";
import { usePlayer } from "../hooks/tetris/usePlayer";
import { useStage } from "../hooks/tetris/useStage";
import { useGameStatus } from "../hooks/tetris/useGameStatus";

// Components
import Stage from "../components/tetris/Stage";
import Display from "../components/tetris/Display";
import StartButton from "../components/tetris/StartButton";

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );

  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const startGame = () => {
    // reset
    setStage(createStage());
    setDropTime(1000 / (level + 1) + 200);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
  };

  const drop = () => {
    // increase level when player clears 10 rows
    if (rows > (level + 1) * 10) {
      setLevel(prev => prev + 1);
      // increase speed
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      if (player.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 40) {
        setDropTime(1000 / (level + 1) + 200);
      }
    }
  };

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };

  const move = ({ keyCode }) => {
    if (!gameOver) {
      switch (keyCode) {
        case 37:
          movePlayer(-1);
          break;
        case 39:
          movePlayer(1);
          break;
        case 40:
          dropPlayer();
          break;
        case 38:
          playerRotate(stage, 1);
          break;
        default:
          break;
      }
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <main>
      <div
        className="tetris-wrapper"
        role="button"
        tabIndex="0"
        onKeyDown={e => move(e)}
        onKeyUp={e => keyUp(e)}
      >
        <div className="tetris">
          <Stage stage={stage} />
          <aside>
            {gameOver ? (
              <Display gameOver={gameOver} text="Game Over" />
            ) : (
              <div>
                <Display text={`Score: ${score}`} />
                <Display text={`Rows: ${rows}`} />
                <Display text={`Level: ${level}`} />
              </div>
            )}
            <StartButton callback={startGame} />
          </aside>
        </div>
      </div>
      <style jsx>{`
        .tetris-wrapper {
          width: 100%;
          height: 100vh;
          // background-color: #63c;
          background-size: cover;
          overflow: hidden;
        }

        .tetris {
          display: flex;
          align-items: flex-start;
          padding: 40px;
          margin: 0 auto;
          max-width: 900px;
        }

        aside {
          width: 100%;
          max-width: 200px;
          display: block;
          padding: 0 20px;
        }
      `}</style>
    </main>
  );
};

export default Tetris;
