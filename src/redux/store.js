import { configureStore } from "@reduxjs/toolkit";
import sliceReducer from "./score";

export const store = configureStore({
  reducer: {
    score: sliceReducer,
  },
});
