// import { createStore } from 'redux';
import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./ui-slice";
import playersSlice from "./players-slice";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    players: playersSlice.reducer,
  },
});

export default store;
