import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: 0,
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
  },
});
export const { increment, decrement } = scoreSlice.actions;
export default scoreSlice.reducer;
