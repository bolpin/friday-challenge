import React from 'react';
import  { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Players from './components/Players';
import Report from './components/Report';

function App() {
  
  return (
    <>
      <nav>
        <a href='/reports'>Reports</a>
        <a href='/offers'>Offers</a>
        <a href='/offer-targets'>Offer Targets</a>
        <a href='/players'>Players</a>
        <a href='/devices'>Devices</a>
      </nav>
      <Router>
        <Switch>
          <Route exact path="/">
            <Report />
          </Route>
          <Route path="/reports">
            <Report />
          </Route>
          <Route path="/devices">
            <h1>TODO Devices</h1>
          </Route>
          <Route path="/players">
            <Players />
          </Route>
          <Route path="/offers">
            <h1>TODO Offers</h1>
          </Route>
          <Route path="/offer-targets">
            <h1>TODO OfferTargets</h1>
          </Route>
        </Switch>
      </Router>
    </>

  );
}
export default App;