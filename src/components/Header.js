import React, { useState, useRef, useEffect } from "react";
import backgroundMusic from "../assets/satisfying_melody.mp3";
import { useNavigate } from "react-router-dom";
import Dialog from "./Dialog";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

function Header() {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const audioRef = useRef(null); // Create a ref for the audio element
  const [musicPlaying, setMusicPlaying] = useState(false);
  const score = useSelector((state) => state.score.value);

  const toggleMusic = () => {
    if (!musicPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setMusicPlaying(!musicPlaying);
  };

  useEffect(() => {
    if (musicPlaying) {
      audioRef.current.play();
    } else {
      // audioRef.current.pause();
    }
  }, [musicPlaying]);

  const handleExit = () => {
    setShowDialog(true);
  };
  const handleConfirm = () => {
    // Handle the confirmation logic
    Swal.fire({
      color: "#716add",
      text: "Continue playing!",
    });
    setShowDialog(false);
  };

  const handleCancel = () => {
    Swal.fire({
      color: "#716add",
      text: "Exiting the game",
    });
    navigate("/");
    setShowDialog(false);
  };
  // const handleExit = () => {
  //   const userConfirmed = window.confirm("Do you want to continue playing?");

  //   if (userConfirmed) {
  //     alert("Continue playing!");
  //   } else {
  //     alert("Exiting the game");
  //     navigate("/");
  //   }
  // };

  return (
    <>
      <div className="d-flex flex-wrap  justify-content-between align-items-center fs-2 fw-bolder">
        <div className="bg-info text-white p-2" onClick={toggleMusic}>
          {musicPlaying ? "Pause Music" : "Play Music"}
        </div>
        {/* Audio element */}
        <audio ref={audioRef} src={backgroundMusic} loop />
        {/* Other elements... */}
        <div className="text-info fs-1">Rock Dodger</div>

        <div className="d-flex flex-column  text-danger p-2">
          <span className=" bg-info">Game Points: {score}</span>
          <span
            className="d-flex justify-content-center text-info bg-secondary"
            onClick={handleExit}
          >
            Exit
          </span>
        </div>
      </div>
      {/* Conditionally render the Dialog component */}
      {showDialog && (
        <Dialog onConfirm={handleConfirm} onCancel={handleCancel} />
      )}
    </>
  );
}

export default Header;
