import React from "react";
import { useNavigate } from "react-router-dom";

function Start() {
  const navigate = useNavigate();

  function startGame() {
    navigate("/main");
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 vw-100">
      <form className="form">
        <div className="container-fluid h-100">
          <div className="buttons row h-100 justify-content-center align-items-center">
            <div className="col-12 text-center">
              <p className="text-info fw-bolder fs-2">THE HUNT</p>
            </div>
            <div className="col-12 text-center">
              <button onClick={startGame} className=" bg-info btn-lg">
                START GAME
              </button>
            </div>
            <div className="col-12 text-center">
              <button className="bg-info btn-lg px-5">Back</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Start;
