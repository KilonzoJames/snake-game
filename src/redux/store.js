import { configureStore } from "@reduxjs/toolkit";
import sliceReducer from "./score";
import positionReducer from "./position.js"

export const store = configureStore({
  reducer: {
    score: sliceReducer,
    position: positionReducer,
  },
});
