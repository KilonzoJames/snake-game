import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  showDialog: false,
  musicPlaying: false,
  isSnakeMoving: true,
};

const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 10;
    },
    decrement: (state) => {
      state.value = 0; // Reset to zero
    },
    setShowDialog: (state) => {
      state.showDialog = !state.showDialog; // Correctly toggle the showDialog property
    },
    setMusicPlaying: (state) => {
      state.musicPlaying = !state.musicPlaying; // Correctly toggle the musicPlaying property
    },
    setIsSnakeMoving: (state) => {
      state.isSnakeMoving = !state.isSnakeMoving; // Correctly toggle the isSnakeMoving property
    },
  },
});

export const { increment, decrement, setShowDialog, setMusicPlaying, setIsSnakeMoving } =
  scoreSlice.actions;
export default scoreSlice.reducer;
