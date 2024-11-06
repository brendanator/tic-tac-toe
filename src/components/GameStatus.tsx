interface GameStatusProps {
  winner: string | null;
  currentPlayer: string;
  isDraw: boolean;
  onReset: () => void;
}

export const GameStatus = ({ winner, currentPlayer, isDraw, onReset }: GameStatusProps) => {
  return (
    <div className="text-center mt-4">
      <div className="text-xl mb-4">
        {winner ? (
          <span className="text-success">Player {winner} wins!</span>
        ) : isDraw ? (
          <span className="text-info">Game is a draw!</span>
        ) : (
          <span>Current player: {currentPlayer}</span>
        )}
      </div>
      <button className="btn btn-primary" onClick={onReset}>
        New Game
      </button>
    </div>
  );
};
