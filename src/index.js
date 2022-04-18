import React from 'react';
import './index.css';
import App from './App';
import Players from "./components/Players/Players";
import Offers from "./components/Offers/Offers";
import Devices from "./components/Devices/Devices";
import OfferTargets from "./components/OfferTargets/OfferTargets";
import Reports from "./components/Reports/Reports";
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, } from "react-router-dom";

import { Provider } from 'react-redux';
import store from './store/index';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store} >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} >
            <Route path="/" element={<Reports />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/players" element={<Players />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/offer-targets" element={<OfferTargets />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
