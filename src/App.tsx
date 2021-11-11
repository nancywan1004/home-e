import React from 'react';
import { Connect } from 'aws-amplify-react';
import { Route, Router } from 'react-router-dom';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import { WelcomePanel } from './components/WelcomePanel';
import { DonutPanel } from './components/DonutPanel';

import './App.css';
import { ControlCenter } from './components/controlCenter/ControlCenter';

const useStyles = makeStyles({
  
  dashboard: {
    display: "flex",
    flexDirection: "row"
  },
});


function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <WelcomePanel />
      <div className={classes.dashboard}>
        <DonutPanel />
        <ControlCenter />
      </div>
      {/* <Connect>
      </Connect> */}
      
    </div>
  );
}

export default App;
