import React, { useEffect } from "react";

import Header from "./components/UI/Header";
import Notification from "./components/UI/Notification";

import { fetchLocales } from "./store/locales-actions";
import { fetchDevices } from "./store/devices-actions";
import { fetchPlayers } from "./store/players-actions";
import { fetchGenders } from "./store/genders-actions";
import { fetchOffers } from "./store/offers-actions";
import { fetchOfferTargets } from "./store/offer-targets-actions";
import { fetchOperatingSystems } from "./store/operating-systems-actions";
import { useDispatch, useSelector } from "react-redux";

import { Outlet, NavLink } from "react-router-dom";

import "./App.css";


let isInitialLoad = true;

function App() {

  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);

  let initialRender = true;

  useEffect(() => {
    if (initialRender) {
      initialRender = false;
 
      // populate some needed slices of the store
      dispatch(fetchDevices());
      dispatch(fetchPlayers());
      dispatch(fetchGenders());
      dispatch(fetchLocales());
      dispatch(fetchOperatingSystems());
      dispatch(fetchOffers());
      dispatch(fetchOfferTargets());
    }
  }, []);

  return (
    <>
      <Header />

      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}

      <Outlet />
    </>
  );
}
export default App;
