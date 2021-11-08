import React from 'react';
import { Connect } from 'aws-amplify-react';
import { Route, Router } from 'react-router-dom';
import { Link } from "react-router-dom";

import { WelcomePanel } from './components/WelcomePanel';
import { DonutPanel } from './components/DonutPanel';
import { AreaChart } from './components/AreaChart';

import './App.css';

function App() {
  return (
    <div className="App">
      {/* <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem"
        }}
      >
      </nav> */}
      <WelcomePanel />
      <DonutPanel />
      {/* <Connect>
      </Connect> */}
      
    </div>
  );
}

export default App;
