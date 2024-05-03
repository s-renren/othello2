import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);

  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 3, 0, 0, 0, 0],
    [0, 0, 3, 2, 1, 0, 0, 0],
    [0, 0, 0, 1, 2, 3, 0, 0],
    [0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const blackN = board.flat().filter((numB) => numB === 1).length;
  const whiteN = board.flat().filter((numW) => numW === 2).length;

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

  const proposeBoard = (turnColor: number, proBoard: number[][]) => {
    // 候補地を出す
    for (let j = 0; j <= 7; j++) {
      for (let i = 0; i <= 7; i++) {
        if (proBoard[i][j] === 0) {
          for (let k = 0; k <= 7; k++) {
            if (
              proBoard[i + directions[k][0]] !== undefined &&
              proBoard[i + directions[k][0]][j + directions[k][1]] === turnColor
            ) {
              for (let p = 1; p <= 7; p++) {
                if (
                  proBoard[i + directions[k][0] * p] !== undefined &&
                  proBoard[i + directions[k][0] * p][j + directions[k][1] * p] === 0
                ) {
                  break;
                } else if (
                  proBoard[i + directions[k][0] * p] !== undefined &&
                  proBoard[i + directions[k][0] * p][j + directions[k][1] * p] === 3
                ) {
                  break;
                } else if (
                  proBoard[i + directions[k][0] * p] !== undefined &&
                  proBoard[i + directions[k][0] * p][j + directions[k][1] * p] === turnColor
                ) {
                  continue;
                } else if (
                  proBoard[i + directions[k][0] * p] !== undefined &&
                  proBoard[i + directions[k][0] * p][j + directions[k][1] * p] === 2 / turnColor
                ) {
                  proBoard[i][j] = 3;
                }
              }
            }
          }
        }
      }
    }
  };

  const clickHandler = (x: number, y: number) => {
    if (board[y][x] !== 3) {
      return;
    }
    const newBoard = structuredClone(board);

    // 候補地の初期化
    for (let xAxisR = 0; xAxisR <= 7; xAxisR++) {
      for (let yAxisR = 0; yAxisR <= 7; yAxisR++) {
        newBoard[yAxisR][xAxisR] %= 3;
      }
    }

    // コマをひっくり返す
    if (board[y][x] === 3) {
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
              board[y + directions[s][0] * i][x + directions[s][1] * i] === 3
            ) {
              break;
            } else if (
              board[y + directions[s][0] * i] !== undefined &&
              board[y + directions[s][0] * i][x + directions[s][1] * i] === turnColor
            ) {
              for (let m = i; m >= 0; m--) {
                newBoard[y + directions[s][0] * m][x + directions[s][1] * m] = turnColor;
              }
            }
          }
        }
      }
    } else {
      return;
    }

    // 候補地がなかったらターンを変えずに候補地を出す
    proposeBoard(turnColor, newBoard);
    if (!newBoard.flat().includes(3)) {
      proposeBoard(2 / turnColor, newBoard);
    } else {
      setTurnColor(2 / turnColor);
    }

    setBoard(newBoard);
  };

  const isEnd = !board.flat().includes(3);

  return (
    <div className={styles.container}>
      <p className={styles.result}>
        black:{blackN} vs white:{whiteN}
      </p>
      <p className={styles.turn}>
        {isEnd
          ? `${['白の勝ち', '黒の勝ち', '引き分け'][+(blackN >= whiteN) + +(blackN === whiteN)]}です。`
          : `turn: ${['white', 'black'][turnColor - 1]}`}
      </p>
      <div className={styles.boardStyle}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cellStyle} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.stoneStyle}
                  style={{
                    background: color === 1 ? '#000' : color === 2 ? '#fff' : '#a0d8ef',
                    width: color !== 3 ? '60px' : '30px',
                    height: color !== 3 ? '60px' : '30px',
                  }}
                />
              )}
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default Home;
