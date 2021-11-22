import React from 'react';
import { Connect } from 'aws-amplify-react';
import { Route, Router } from 'react-router-dom';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import { WelcomePanel } from './components/WelcomePanel';
import { DonutPanel } from './components/DonutPanel';

import './App.css';
import { ControlCenter } from './components/controlCenter/ControlCenter';

const useStyles = makeStyles({
  
  dashboard: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
});


function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <WelcomePanel />
      <Grid container alignItems="center" className={classes.dashboard}>
        <Grid item xs={9} md={8}><DonutPanel /></Grid>
        <Grid item xs={2} md={3}><ControlCenter /></Grid>
      </Grid>
      {/* <Connect>
      </Connect> */}
      
    </div>
  );
}

export default App;
