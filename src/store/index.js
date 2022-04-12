// import { createStore } from 'redux';
import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./ui-slice";
import playersSlice from "./players-slice";
import offerTargetsSlice from "./offer-targets-slice";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    players: playersSlice.reducer,
    offerTargets: offerTargetsSlice.reducer,
  },
});

export default store;
