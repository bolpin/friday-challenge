import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Players from "./components/Players/Players";
import Offers from "./components/Offers/Offers";
import Devices from "./components/Devices/Devices";
import OfferTargets from "./components/OfferTargets/OfferTargets";
import Report from "./components/Reports/Report";
import { useSelector, useDispatch } from "react-redux";
import Notification from './components/UI/Notification';

import { fetchDevices } from './store/devices-actions';
import { fetchOffers } from './store/offers-actions';
import { fetchPlayers } from './store/players-actions';
import { fetchLocales } from './store/locales-actions';
import { fetchOperatingSystems } from './store/operating-systems-actions';
import { fetchGenders } from './store/genders-actions';
import { fetchOfferTargets } from './store/offer-targets-actions';

function App() {

  const dispatch = useDispatch();

  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    // load up the db data into state slices:
    dispatch(fetchOffers());
    dispatch(fetchPlayers());
    dispatch(fetchDevices());
    dispatch(fetchLocales());
    dispatch(fetchOperatingSystems());
    dispatch(fetchOfferTargets());
    dispatch(fetchGenders());
  }, [dispatch]);

  const isInitial = true;

  return (
    <>
      <nav>
        <a href="/reports">Reports</a>
        <a href="/offers">Offers</a>
        <a href="/offer-targets">Offer Targets & Players Matching</a>
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
            <Report />
          </Route>
          <Route path="/reports">
            <Report />
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
