import { useState } from 'react';
import { Board } from './components/Board';
import { GameStatus } from './components/GameStatus';
import './index.css';

function calculateWinner(squares: string[]): [string | null, number[]] {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], [a, b, c]];
    }
  }
  return [null, []];
}

function App() {
  const [squares, setSquares] = useState<string[]>(Array(9).fill(''));
  const [xIsNext, setXIsNext] = useState(true);
  const [winningSquares, setWinningSquares] = useState<number[]>([]);

  const handleClick = (i: number) => {
    if (squares[i] || calculateWinner(squares)[0]) return;
    
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);

    const [winner, winningLine] = calculateWinner(newSquares);
    if (winner) {
      setWinningSquares(winningLine);
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(''));
    setXIsNext(true);
    setWinningSquares([]);
  };

  const [winner] = calculateWinner(squares);
  const isDraw = !winner && squares.every(square => square !== '');

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="card bg-base-100 shadow-xl p-8">
        <h1 className="text-4xl font-bold text-center mb-8">Tic Tac Toe</h1>
        <div className="flex flex-col items-center">
          <Board
            squares={squares}
            winningSquares={winningSquares}
            onClick={handleClick}
          />
          <GameStatus
            winner={winner}
            currentPlayer={xIsNext ? 'X' : 'O'}
            isDraw={isDraw}
            onReset={resetGame}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
