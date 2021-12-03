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
import { AchievementPanel } from './components/AchievementPanel';

const useStyles = makeStyles({
  upperSection: {
    display: "flex",
    justifyContent: "space-evenly"
  },
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
      <Grid container className={classes.upperSection} columns={{ xs: 6, sm: 8, md: 12 }}>
        <Grid item xs={4} md={8}><WelcomePanel /></Grid>
        <Grid item xs={1} md={3}><AchievementPanel /></Grid>
      </Grid>
      <Grid container alignItems="center" className={classes.dashboard} columns={{ xs: 6, sm: 8, md: 12 }}>
        <Grid item xs={4} md={8}><DonutPanel /></Grid>
        <Grid item xs={1} md={3}><ControlCenter /></Grid>
      </Grid>
      {/* <Connect>
      </Connect> */}
      
    </div>
  );
}

export default App;
