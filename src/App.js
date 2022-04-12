import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Players from "./components/Players";
import Offers from "./components/Offers/Offers";
import Devices from "./components/Devices/Devices";
import OfferTargets from "./components/OfferTargets/OfferTargets";
import Report from "./components/Report";
import Playground from "./components/Playground";
import { useSelector, useDispatch } from "react-redux";
import Notification from './components/UI/Notification';
import { fetchPlayers } from './store/players-actions';

function App() {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(fetchPlayers());
  }, [dispatch]);

  const isInitial = true;

  // useEffect(() => {
  //   if (isInitial) {
  //     isInitial = false;
  //     return;
  //   }

  //   if (cart.changed) {
  //     dispatch(sendCartData(cart));
  //   }
  // }, [cart, dispatch]);

  return (
    <>
      <nav>
        <a href="/playground">Playground</a>
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
            <Report />
          </Route>
          <Route path="/playground">
            <Playground />
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
