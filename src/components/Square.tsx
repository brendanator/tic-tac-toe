interface SquareProps {
  value: string;
  onClick: () => void;
  isWinner: boolean;
}

export const Square = ({ value, onClick, isWinner }: SquareProps) => {
  return (
    <button
      className={`board-square ${isWinner ? 'winner' : ''}`}
      onClick={onClick}
      disabled={value !== ''}
    >
      {value}
    </button>
  );
};
