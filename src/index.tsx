import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Amplify from '@aws-amplify/core'
import config from './aws-exports'
import './index.css';
import App from './App';
import {UtilitiesPage} from './components/UtilitiesPage';

Amplify.configure(config)

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        {/* <Route path="invoices" element={<Invoices />} /> */}
      </Route>
      <Route path="/utilities" element={<UtilitiesPage />}>
        <Route path=":utilityType" element={<UtilitiesPage />} />
      </Route>
      
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

