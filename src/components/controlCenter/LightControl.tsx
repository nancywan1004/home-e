import React, { useState } from 'react';
import { Card, CardContent, Button, CardMedia, Typography, IconButton, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Outlet, Link } from "react-router-dom";

import { Doughnut } from 'react-chartjs-2';
import { COLORS } from '../../constants/Colors';

const useStyles = (isOn: any) => makeStyles({
  root: {
    margin: "auto",
    marginTop: "1rem",
    marginBottom: "1rem",
    border: "0.1px solid transparent",
    borderRadius: "40px",
    width: "40%",
    padding: "2rem",
    backgroundColor: isOn ? COLORS.green : COLORS.gray
  },
  roomIcon: {
    margin: "auto",
    width: "2.5rem",
    height: "3rem",
    filter : isOn ? "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(177deg) brightness(104%) contrast(101%)" : "brightness(0) saturate(100%) invert(70%) sepia(6%) saturate(13%) hue-rotate(20deg) brightness(107%) contrast(96%);"
  },
  roomTitle: {
    color: COLORS.white
  }
});


export function LightControl(props: any) {
    const [isOn, setOnOff] = useState(props.isOn);
    const classes = useStyles(isOn)();

    return (
        <div className={classes.root} onClick={() => {
          setOnOff(!isOn);
        }}
        >
          <img className={classes.roomIcon} src={props.iconUrl}
          >
          </img>
          <span className={classes.roomTitle}>{props.title}</span>
      </div>
    )
}