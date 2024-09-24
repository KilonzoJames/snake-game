import { createSlice } from "@reduxjs/toolkit";
import {
  foodInitialPosition,
  snakeInitialPosition,
  totalGridSize,
} from "../components/constants";
const initialState = {
  food: foodInitialPosition,
  snake: snakeInitialPosition,
};

let randomX;
let randomY;

const positionSlice = createSlice({
  name: "position",
  initialState,
  reducers: {
    setSnake: (state, action) => {
      state.snake = action.payload; // Update the snake position
    },
    setFood: (state, action) => {
      state.food = action.payload; // Update the food position
    },
    resetPosition: (state) => {
      // Reset the state to its initial values
      state.snake = snakeInitialPosition;
      state.food = foodInitialPosition;
    },
    renderFood: (state) => {
        // Calculate random X and Y positions within the grid size
        randomX = Math.floor(Math.random() * totalGridSize);
        randomY = Math.floor(Math.random() * totalGridSize);
        
        // Update the state with new food position
        state.food = { x: randomX, y: randomY };
      },
  },
});

export const { setSnake, setFood, resetPosition, renderFood } = positionSlice.actions;
export default positionSlice.reducer;
