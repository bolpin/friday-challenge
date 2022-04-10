import React from 'react';
import  { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Players from './components/Players';
import Offers from './components/Offers/Offers';
import Report from './components/Report';

function App() {
  
  return (
    <>
      <nav>
        <a href='/reports'>Reports</a>
        <a href='/offers'>Offers</a>
        <a href='/offer-targets'>Offer Targets</a>
        <a href='/players'>Players & Devices</a>
      </nav>
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
          <Route path="/offers">
            <Offers />
          </Route>
          <Route path="/offer-targets">
            OfferTargets
          </Route>
        </Switch>
      </Router>
    </>

  );
}
export default App;