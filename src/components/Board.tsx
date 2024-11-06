import { Square } from './Square';

interface BoardProps {
  squares: string[];
  winningSquares: number[];
  onClick: (i: number) => void;
}

export const Board = ({ squares, winningSquares, onClick }: BoardProps) => {
  const renderSquare = (i: number) => {
    return (
      <Square
        value={squares[i]}
        onClick={() => onClick(i)}
        isWinner={winningSquares.includes(i)}
      />
    );
  };

  return (
    <div className="grid grid-cols-3 gap-2 max-w-[320px]">
      {[...Array(9)].map((_, i) => (
        <div key={i}>{renderSquare(i)}</div>
      ))}
    </div>
  );
};
