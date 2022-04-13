// import { createStore } from 'redux';
import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./ui-slice";
import offersSlice from "./offers-slice";
import playersSlice from "./players-slice";
import devicesSlice from "./devices-slice";
import offerTargetsSlice from "./offer-targets-slice";
import localesSlice from "./locales-slice";
import gendersSlice from "./genders-slice";
import operatingSystemsSlice from "./operating-systems-slice";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    offers: offersSlice.reducer,
    locales: localesSlice.reducer,
    players: playersSlice.reducer,
    genders: gendersSlice.reducer,
    operatingSystems: operatingSystemsSlice.reducer,
    devices: devicesSlice.reducer,
    offerTargets: offerTargetsSlice.reducer,
  },
});

export default store;
