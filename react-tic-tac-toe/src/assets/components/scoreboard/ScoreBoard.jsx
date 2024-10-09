/* eslint-disable react/prop-types */
import "./ScoreBoard.css";

export default function ScoreBoard({ player }) {
  return (
    <div className="scoreboard">
      <h1 className="scoreboard-title">{player.name}</h1>
      <div className="scoreboard-score">
        <h3 className="scoreboard-wins-score">{player.score}</h3>
      </div>
    </div>
  );
}
