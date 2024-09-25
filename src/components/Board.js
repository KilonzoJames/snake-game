import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, setIsSnakeMoving } from "../redux/score";
import Swal from "sweetalert2";
import { totalGridSize } from "./constants";
import { useNavigate } from "react-router-dom";
import { setSnake, resetPosition, renderFood } from "../redux/position";

function Board() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const score = useSelector((state) => state.score.value);
  const isSnakeMoving = useSelector((state) => state.score.isSnakeMoving);
  const position = useSelector((state) => state.position);
  const { food, snake } = position;

  let touchStartX = 0;
  let touchStartY = 0;
  let threshold = 30;

  // Game State
  const [direction, setDirection] = useState("LEFT");

  function startGame() {
    // Reset snake to its initial position
    dispatch(resetPosition());

    // Reset other game variables (like score, speed, etc.)
    dispatch(decrement());

    // Start snake movement
    dispatch(setIsSnakeMoving()); // Turn snake movement on

    // Optionally reset other game components
    dispatch(renderFood()); // Add this line to place food initially
    console.log("Game restarted!");
  }

  function renderBoard() {
    let cellArray = [];

    for (let row = 0; row < totalGridSize; row++) {
      for (let col = 0; col < totalGridSize; col++) {
        let classes = "cell";

        let isFood = food.x === row && food.y === col;

        let isSnakeHead = snake[0].x === row && snake[0].y === col;

        let isSnake = snake.some((ele) => ele.x === row && ele.y === col);

        if (isFood) {
          classes = `${classes} food`;
        }

        if (isSnake) {
          classes = `${classes} snake`;
        }

        if (isSnakeHead) {
          classes = `${classes} snake-head`;
        }

        let cell = <div key={`${row}-${col}`} className={classes}></div>;

        cellArray.push(cell);
      }
    }

    return cellArray;
  }

  function gameOver() {
    dispatch(resetPosition());
    dispatch(setIsSnakeMoving());
    Swal.fire({
      title: "Game Over!",
      text: `Your final score is: ${score}`,
      icon: "error", // More visual feedback for game over
      color: "green",
      confirmButtonText: "Play Again.",
      cancelButtonText: "Exit Game!",
      cancelButtonColor: "Crimson",
      confirmButtonColor: "Green",
      showCancelButton: true,
      background: "#000", // Optional: give the alert a custom background
    }).then((result) => {
      if (result.isConfirmed) startGame();
      else navigate("/");
    });
  }
  function updateGame() {
    // Checking For Game Over
    if (
      snake[0].x < 0 ||
      snake[0].x > 20 ||
      snake[0].y < 0 ||
      snake[0].y > 20
    ) {
      gameOver();
      return;
    }

    // Checking If snake bit itself
    const isBit = snake
      .slice(1)
      .some((ele) => ele.x === snake[0].x && ele.y === snake[0].y);
    if (isBit) {
      gameOver();
      return;
    }

    let newSnake = [...snake];
    if (direction === "UP") {
      newSnake.unshift({ x: newSnake[0].x - 1, y: newSnake[0].y });
    }
    if (direction === "DOWN") {
      newSnake.unshift({ x: newSnake[0].x + 1, y: newSnake[0].y });
    }
    if (direction === "LEFT") {
      newSnake.unshift({ x: newSnake[0].x, y: newSnake[0].y - 1 });
    }
    if (direction === "RIGHT") {
      newSnake.unshift({ x: newSnake[0].x, y: newSnake[0].y + 1 });
    }

    // checking if food was eaten on not
    if (newSnake[0].x === food.x && newSnake[0].y === food.y) {
      // Ate Food
      dispatch(increment()); // Dispatch your action
      dispatch(renderFood());
    } else {
      newSnake.pop();
    }

    dispatch(setSnake(newSnake));
  }

  function updateDirection(e) {
    let key = e.code;

    switch (key) {
      case "ArrowUp":
        if (direction !== "DOWN") {
          setDirection("UP");
          console.log("Direction set to UP");
        }
        break;
      case "ArrowDown":
        if (direction !== "UP") {
          setDirection("DOWN");
          console.log("Direction set to DOWN");
        }
        break;
      case "ArrowLeft":
        if (direction !== "RIGHT") {
          setDirection("LEFT");
          console.log("Direction set to LEFT");
        }
        break;
      case "ArrowRight":
        if (direction !== "LEFT") {
          setDirection("RIGHT");
          console.log("Direction set to RIGHT");
        }
        break;
      default:
        return;
    }
  }

  // Handle touch events for mobile swipes
  const handleTouchStart = (e) => {
    e.preventDefault(); // Prevent default scrolling
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    const touchEndX = e.touches[0].clientX;
    const touchEndY = e.touches[0].clientY;

    // Calculate the difference between touch start and end
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    // Determine if the swipe exceeds the threshold
    if (Math.abs(deltaX) > threshold || Math.abs(deltaY) > threshold) {
      // Determine the swipe direction based on the difference
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > 0) {
          setDirection("RIGHT");
          console.log("Direction set to RIGHT");
        } else {
          setDirection("LEFT");
          console.log("Direction set to LEFT");
        }
      } else {
        // Vertical swipe
        if (deltaY > 0) {
          setDirection("DOWN");
          console.log("Direction set to DOWN");
        } else {
          setDirection("UP");
          console.log("Direction set to UP");
        }
      }
    }
  };

  // Handle Events and Effects
  useEffect(() => {
    let moveSnake;

    if (isSnakeMoving) {
      moveSnake = setInterval(updateGame, 150);
    }

    return () => clearInterval(moveSnake);
  }, [isSnakeMoving, updateDirection]);

  // Handle Events and Effects
  useEffect(() => {
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, []); // Include direction to keep updated

  useEffect(() => {
    document.addEventListener("keydown", updateDirection);
    return () => {
      document.removeEventListener("keydown", updateDirection);
    };
  }, [direction]);

  return <div className="board">{renderBoard()}</div>;
}

export default Board;
