import React, { useState } from 'react';
import { Card, CardContent, Button, CardMedia, Typography, IconButton, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Outlet, Link } from "react-router-dom";

import { Doughnut } from 'react-chartjs-2';
import { COLORS } from '../../constants/Colors';

const useStyles = makeStyles({
  root: {
    margin: "auto",
    marginTop: "1rem",
    marginBottom: "1rem",
    border: "0.1px solid transparent",
    borderRadius: "40px",
    width: "50%",
    padding: "2rem",
    backgroundColor: COLORS.gray
  },
  icons: {
    display: "flex",
    justifyContent: "center"
  },
  roomIcon: {
    width: "40%",
    margin: "0.5rem 0 0.5rem 0"
  },
  arrowIcon: {
    width: "30%"
  },
  arrowButton: {
    padding: 0 
  },
  roomTitle: {
    color: COLORS.white,
    margin: "auto -0.5rem auto -0.5rem"
  }
});


export function TemperatureControl(props: any) {
    const [temp, setTemp]: any = useState("20.1");
    const classes = useStyles();

    return (
        <div className={classes.root}>
        <h3 className={classes.roomTitle}>{temp}</h3>
        <div className={classes.icons}>
        <Button className={classes.arrowButton} onClick={() => {
            setTemp((parseFloat(temp) - 0.1).toFixed(1));
        }}><img className={classes.arrowIcon} src="/images/arrow-down.png"></img></Button>
          <img className={classes.roomIcon} src="/images/temperature-grid.png"></img>
          <Button className={classes.arrowButton} onClick={() => {
          setTemp((parseFloat(temp) + 0.1).toFixed(1));
        }}><img className={classes.arrowIcon} src="/images/arrow-up.png"></img></Button>
        </div>
          <span className={classes.roomTitle}>Home</span>
      </div>
    )
}