document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('reset-button');

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    resetButton.addEventListener('click', resetGame);

    async function handleCellClick(event) {
        const cell = event.target;
        const position = parseInt(cell.dataset.index);

        try {
            const response = await fetch('/move', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ position }),
            });

            const data = await response.json();

            if (response.ok) {
                updateBoard(data);
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while making the move');
        }
    }

    function updateBoard(gameState) {
        gameState.board.forEach((value, index) => {
            cells[index].textContent = value;
        });

        if (gameState.game_over) {
            if (gameState.winner === 'draw') {
                status.textContent = "Game Over - It's a Draw!";
            } else {
                status.textContent = `Game Over - ${gameState.winner} Wins!`;
            }
        } else {
            status.textContent = `Current player: ${gameState.current_player}`;
        }
    }

    async function resetGame() {
        try {
            const response = await fetch('/reset', {
                method: 'POST',
            });
            const gameState = await response.json();
            
            cells.forEach(cell => cell.textContent = '');
            status.textContent = 'Current player: X';
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while resetting the game');
        }
    }
});
