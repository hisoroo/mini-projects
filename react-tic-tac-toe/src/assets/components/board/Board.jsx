/* eslint-disable react/prop-types */
import "./Board.css";
import X from "/src/assets/X.svg";
import O from "/src/assets/O.svg";


export default function Board({cells, onCellClick}) {
  return (
    <div className="board">
      {cells.map((cell, index) => (
        <button key={index} className="cell" onClick={() => onCellClick(index)}>
          {cell === 'X' && <img className="X" src={X} alt="X" />}
          {cell === 'O' && <img className="O" src={O} alt="O" />}
        </button>
      ))}
    </div>
  );
}
