import "./App.css";
import Board from "./assets/components/board/Board";
import ScoreBoard from "./assets/components/scoreboard/ScoreBoard";
//import ChooseMode from "./assets/components/ChooseMode/ChooseMode";
import { useState, useEffect } from "react";

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6] // diagonals
];

function App() {
  const [cells, setCells] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(true); // true - player, false - computer
  const [winner, setWinner] = useState(undefined); // 'X' - player, 'O' - computer
  const [isTie, setIsTie] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [scores, setScores] = useState({ player: 0, computer: 0 });

  useEffect(() => {
    const winner = checkWinner(cells);
    if (winner) {
      setWinner(winner);
      setIsTie(false);
      setShowModal(true);
    } else if (cells.every(cell => cell !== null)) {
      setIsTie(true);
      setWinner(null);
      setShowModal(true);
    }
  }, [cells]);

  const handleClick = (index) => {
    if (!cells[index] && !winner) {
      const newCells = cells.slice();
      newCells[index] = turn ? "X" : "O";
      setCells(newCells);
      setTurn(!turn);
    }
  };

  const checkWinner = (cells) => {
    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        return cells[a];
      }
    }
    return null;
  };

  const restartGame = () => {
    if (winner === 'X') {
      setScores(prevScores => ({ ...prevScores, player: prevScores.player + 1 }));
    } else if (winner === 'O') {
      setScores(prevScores => ({ ...prevScores, computer: prevScores.computer + 1 }));
    }
    setCells(Array(9).fill(null));
    setTurn(true);
    setWinner(undefined);
    setIsTie(false);
    setShowModal(false);
  };

  return (
    <div className="container">
      <h1 className="game-name">TicTacToe</h1>
      <div className="game">
        <ScoreBoard player={{ name: "Player", score: scores.player }} />
        <Board cells={cells} onCellClick={handleClick} />
        <ScoreBoard player={{ name: "Computer", score: scores.computer }} />
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            {winner && <p>Winner: {winner}</p>}
            {isTie && <p>It&rsquo;s a tie!</p>}
            <button className="modal-button" onClick={restartGame}>Restart</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
