import React from "react";
import Square from "./square.js";

function Board(props) {
  function renderSquare(i) {
    const { squares, onClick, winningLine } = props;
    console.log(winningLine);

    if (winningLine && winningLine.includes(i)) {
      return (
        <Square
          value={squares[i]}
          onClick={() => onClick(i)}
          key={i}
          winningSquare={true}
        />
      );
    } else {
        return <Square value={squares[i]} onClick={() => onClick(i)} key={i} />;
    }
  }

  function getRow(start) {
    const range = Array.from({ length: 3 }, (_, i) => start + i);
    return (
      <div key={start} className="board-row">
        {range.map((number) => renderSquare(number))}
      </div>
    );
  }

  function buildBoard() {
    return Array.from({ length: 3 }, (_, i) => getRow(i * 3));
  }
  
  return <div>{buildBoard()}</div>;
}

export default Board;
