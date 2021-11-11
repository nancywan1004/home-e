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
    width: "40%",
    padding: "2rem",
  },
  roomIcon: {
    margin: "auto",
    width: "2.5rem",
    height: "3rem"
  },
  roomTitle: {
    color: COLORS.white
  }
});


export function LightControl(props: any) {
    const [isOn, setOnOff] = useState(props.isOn);
    const classes = useStyles(isOn);

    return (
        <div className={classes.root} onClick={() => {
          setOnOff(!isOn);
        }}
        style={{backgroundColor: isOn ? COLORS.green : COLORS.gray}}
        >
          <img className={classes.roomIcon} src={props.iconUrl}></img>
          <span className={classes.roomTitle}>{props.title}</span>
      </div>
    )
}