import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../redux/score";
import Swal from "sweetalert2";
import { totalGridSize, snakeInitialPosition } from "./constants";
import { useNavigate } from "react-router-dom";

function Board() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const score = useSelector((state) => state.score.value);
  const [isSnakeMoving, setIsSnakeMoving] = useState(true);

  // Game State
  const [food, setFood] = useState({
    x: 5,
    y: 5,
  });
  const [snake, setSnake] = useState(snakeInitialPosition);

  const [direction, setDirection] = useState("LEFT");

  function startGame() {
    // Reset snake to its initial position
    setSnake(snakeInitialPosition);

    // Reset other game variables (like score, speed, etc.)
    dispatch(decrement());

    // Start snake movement
    setIsSnakeMoving(true); // Turn snake movement on

    // Optionally reset other game components
    setFood({
      x: 5,
      y: 5,
    });
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
  function renderFood() {
    let randomX = Math.floor(Math.random() * totalGridSize);
    let randomY = Math.floor(Math.random() * totalGridSize);

    setFood({
      x: randomX,
      y: randomY,
    });
  }

  function gameOver() {
    setSnake(snakeInitialPosition);
    toggleSnakeMovement();
    Swal.fire({
      title: "Game Over!",
      text: `Your final score is: ${score}`,
      icon: "error", // More visual feedback for game over
      color: "green",
      confirmButtonText: "Play Again.",
      cancelButtonText: "Exit Game!",
      cancelButtonColor: 'Crimson',
      confirmButtonColor: 'Green',
      showCancelButton: true,
      background: "#000", // Optional: give the alert a custom background
    }).then((result) => {
      if (result.isConfirmed) {
        // Restart the game if "Play Again" is clicked
        startGame();
      } else {
        // Perform any additional cleanup or exit actions
        navigate("/");
      }
    });
    dispatch(decrement());
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
      renderFood();
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }

  function updateDirection(e) {
    let key = e.code;

    switch (key) {
      case "ArrowUp":
        if (direction !== "DOWN") setDirection("UP");
        break;
      case "ArrowDown":
        if (direction !== "UP") setDirection("DOWN");
        break;
      case "ArrowLeft":
        if (direction !== "RIGHT") setDirection("LEFT");
        break;
      case "ArrowRight":
        if (direction !== "LEFT") setDirection("RIGHT");
        break;
      default:
        return;
    }
  }

  // Handle Events and Effects
  useEffect(() => {
    let moveSnake;

    if (isSnakeMoving) {
      moveSnake = setInterval(updateGame, 150);
    }

    return () => clearInterval(moveSnake);
  }, [isSnakeMoving, updateDirection]);
  const toggleSnakeMovement = () => {
    setIsSnakeMoving(!isSnakeMoving);
  };

  useEffect(() => {
    document.addEventListener("keydown", updateDirection);

    return () => document.removeEventListener("keydown", updateDirection);
  });
  return <div className="board">{renderBoard()}</div>;
}

export default Board;
