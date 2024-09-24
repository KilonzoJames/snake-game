import React, { useRef, useEffect } from "react";
import backgroundMusic from "../assets/satisfying_melody.mp3";
import { useNavigate } from "react-router-dom";
import Dialog from "./Dialog";
import { useSelector, useDispatch } from "react-redux";
import { setShowDialog, setMusicPlaying } from "../redux/score";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const score_data = useSelector((state) => state.score);
  const { value, showDialog, musicPlaying } = score_data;
  const audioRef = useRef(null); // Create a ref for the audio element

  const toggleMusic = () => {
    if (!musicPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    dispatch(setMusicPlaying());
  };

  useEffect(() => {
    if (musicPlaying) {
      audioRef.current.play();
    } else {
      // audioRef.current.pause();
    }
  }, [musicPlaying]);

  const handleExit = () => {
    dispatch(setShowDialog());
  };
  const handleConfirm = () => {
    // Handle the confirmation logic
    dispatch(setShowDialog());
  };

  const handleCancel = () => {
    navigate("/");
    dispatch(setShowDialog());
  };

  return (
    <>
      <div className="d-flex flex-wrap  justify-content-between align-items-center fs-4 fw-bolder">
        <div className="bg-info text-white p-2" onClick={toggleMusic}>
          {musicPlaying ? "Pause Music" : "Play Music"}
        </div>
        {/* Audio element */}
        <audio ref={audioRef} src={backgroundMusic} loop />
        {/* Other elements... */}
        <div className="text-info fs-1">Rock Dodger</div>

        <div className="d-flex flex-column  text-danger p-2">
          <span className="bg-info">Game Points: {value}</span>
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
