import React, { useEffect } from "react";

import Header from "./components/UI/Header";
import Notification from "./components/UI/Notification";

import { fetchLocales } from "./store/locales-actions";
import { fetchDevices } from "./store/devices-actions";
import { fetchPlayers } from "./store/players-actions";
import { fetchGenders } from "./store/genders-actions";
import { fetchOperatingSystems } from "./store/operating-systems-actions";
import { useDispatch, useSelector } from "react-redux";

import { Outlet, NavLink } from "react-router-dom";

import "./App.css";


let isInitialLoad = true;

function App() {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(fetchDevices());
    dispatch(fetchPlayers());
    dispatch(fetchGenders());
    dispatch(fetchLocales());
    dispatch(fetchOperatingSystems());
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
