import React, { useState } from "react";
import ReactDOM from "react-dom";
import './index.css';
import Board from './board.js';

function Game() {
  const [history, setHistory] = useState([{
    squares: Array(9).fill(null),
  }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const [isSortingAscending, setIsSortingAscending] = useState(true);
  const toggleSorting = () => setIsSortingAscending(prevState => !prevState);
  const sortButtonText = isSortingAscending ? 'Sort Descending' : 'Sort Ascending';

  const handleClick = (i) => {
    const currentHistory = history.slice(0, stepNumber + 1);
    const current = currentHistory[currentHistory.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? 'X' : 'O';
    setHistory([...currentHistory, {
      squares: squares,
      squareNumber: i,
    }]);
    setStepNumber(currentHistory.length);
    setXIsNext(!xIsNext);
  }

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  }

  let _winningLine;
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];

      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        _winningLine = lines[i];
        return squares[a];
      }
    }

    return null;
  }

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = history.map((step, move) => {
    const desc = move ?
      `Go to move #${move} (${step.squareNumber % 3}, ${Math.floor(step.squareNumber / 3)})` :
      'Go to game start';

    return (
      <li key={move}>
        <button
          onClick={() => jumpTo(move)}
        >
          {move === stepNumber ? <b>{desc}</b> : desc}
        </button>
      </li>
    );
  });

  const draw = !current.squares.includes(null) && !winner;
  const winnerOrNextPlayer = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;
  const status = draw ? 'Draw' : winnerOrNextPlayer;

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={handleClick} winningLine={_winningLine}/>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <div className="sort-button">
          <button onClick={toggleSorting}>{sortButtonText}</button>
        </div>
        <ol>{isSortingAscending ? moves : moves.slice().reverse()}</ol>
      </div>
    </div>
  );

}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
