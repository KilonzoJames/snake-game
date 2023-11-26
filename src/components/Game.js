import React from "react";
import Header from "./Header";
import Board from "./Board";

function Game() {
  return (
    <div className="d-flex flex-column">
      <Header />
      <Board />
    </div>
  );
}

export default Game;
