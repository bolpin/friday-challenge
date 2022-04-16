import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Players from "./components/Players/Players";
import Offers from "./components/Offers/Offers";
import Devices from "./components/Devices/Devices";
import OfferTargets from "./components/OfferTargets/OfferTargets";
import Reports from "./components/Reports/Reports";
import Notification from './components/UI/Notification';
import { fetchLocales } from './store/locales-actions';
import { fetchDevices } from './store/devices-actions';
import { fetchPlayers } from './store/players-actions';
import { fetchGenders } from './store/genders-actions';
import { fetchOperatingSystems } from './store/operating-systems-actions';
import { useDispatch, useSelector } from 'react-redux';

let isInitialLoad = true;


function App() {

  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(fetchDevices());
  }, []);

  useEffect(() => {
    dispatch(fetchPlayers());
  }, []);

  useEffect(() => {
    dispatch(fetchGenders());
    dispatch(fetchLocales());
    dispatch(fetchOperatingSystems());
  }, []);


  return (
    <>
      <nav>
        <a href="/reports">Reports</a>
        <a href="/offers">Offers</a>
        <a href="/offer-targets">Offer Targets</a>
        <a href="/players">Players</a>
        <a href="/devices">Devices</a>
      </nav>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Router>
        <Switch>
          <Route exact path="/">
            <Reports />
          </Route>
          <Route path="/reports">
            <Reports />
          </Route>
          <Route path="/players">
            <Players />
          </Route>
          <Route path="/devices">
            <Devices />
          </Route>
          <Route path="/offers">
            <Offers />
          </Route>
          <Route path="/offer-targets">
            <OfferTargets />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
export default App;
