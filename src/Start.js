import React from 'react'
import { useNavigate } from 'react-router-dom';


function Start() {
const navigate = useNavigate();
function startGame(){
    navigate('/game');
}

  return (
    <div>   
        <form className="form">
        <p className="text-center text-info fw-bolder fs-2 mt-4">THE HUNT</p>
        <button onClick={startGame} className="btn1">START GAME</button>
        <button className="btn2">Back</button>
        </form>
    </div>
  )
}

export default Start