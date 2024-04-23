import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [blackN, setBlackN] = useState(2);
  const [whiteN, setWhiteN] = useState(2);

  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const clickHandler = (x: number, y: number) => {
    const newBoard = structuredClone(board);
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    if (board[y][x] === 0) {
      for (let s = 0; s <= 7; s++) {
        if (
          board[y + directions[s][0]] !== undefined &&
          board[y + directions[s][0]][x + directions[s][1]] === 2 / turnColor
        ) {
          for (let i = 1; i <= 7; i++) {
            if (
              board[y + directions[s][0] * i] !== undefined &&
              board[y + directions[s][0] * i][x + directions[s][1] * i] === 0
            ) {
              break;
            } else if (
              board[y + directions[s][0] * i] !== undefined &&
              board[y + directions[s][0] * i][x + directions[s][1] * i] === turnColor
            )
              for (let m = i; m >= 0; m--) {
                newBoard[y + directions[s][0] * m][x + directions[s][1] * m] = turnColor;
              }
            setTurnColor(2 / turnColor);
            setBoard(newBoard);
          }
        }
      }
    }
  };

  return (
    <div>
      <div>
        black:{blackN} vs white:{whiteN}
      </div>
      <div className={styles.container}>
        <div className={styles.boardStyle}>
          {board.map((row, y) =>
            row.map((color, x) => (
              <div
                className={styles.cellStyle}
                key={`${x}-${y}`}
                onClick={() => clickHandler(x, y)}
              >
                {color !== 0 && (
                  <div
                    className={styles.stoneStyle}
                    style={{ background: color === 1 ? '#000' : '#fff' }}
                  />
                )}
              </div>
            )),
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
