import React from "react";
import Square from './square.js';

class Board extends React.Component {
  
  renderSquare(i) {
    const { squares, onClick } = this.props;
    return <Square value={squares[i]} onClick={() => onClick(i)} key={i} />;
  }

  getRow(start) {
    const range = Array.from({ length: 3 }, (_, i) => start + i);
    return (
      <div className="board-row">
        {range.map((number) => this.renderSquare(number))}
      </div>
    );
  }

  buildBoard() {
    return Array.from({ length: 3 }, (_, i) => this.getRow(i * 3));
  }

  render() {
    return <div>{this.buildBoard()}</div>;
  }
}

export default Board;
