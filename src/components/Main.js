import React from "react";
import Header from "./Header";
import Board from "./Board";

function Main() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />
      <Board />
    </div>
  );
}

export default Main;
