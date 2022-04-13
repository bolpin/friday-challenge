// import { createStore } from 'redux';
import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./ui-slice";
import playersSlice from "./players-slice";
import devicesSlice from "./devices-slice";
import offersSlice from "./offers-slice";
import offerTargetsSlice from "./offer-targets-slice";
import localesSlice from "./locales-slice";
import gendersSlice from "./genders-slice";
import operatingSystemsSlice from "./operating-systems-slice";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    players: playersSlice.reducer,
    devices: devicesSlice.reducer,
    offers: offersSlice.reducer,
    offerTargets: offerTargetsSlice.reducer,
    locales: localesSlice.reducer,
    genders: gendersSlice.reducer,
    operatingSystems: operatingSystemsSlice.reducer,
  },
});

export default store;
