import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the game board', () => {
    render(<App />);
    expect(screen.getByText('Tic Tac Toe')).toBeDefined();
  });

  it('allows players to make moves', () => {
    render(<App />);
    const squares = screen.getAllByRole('button').slice(0, 9); // Get game squares
    
    // X goes first
    fireEvent.click(squares[0]);
    expect(squares[0]).toHaveTextContent('X');
    
    // O goes second
    fireEvent.click(squares[1]);
    expect(squares[1]).toHaveTextContent('O');
  });
});
