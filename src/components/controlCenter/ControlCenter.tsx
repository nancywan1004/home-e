import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Outlet, Link } from "react-router-dom";

import { Doughnut } from 'react-chartjs-2';
import { COLORS } from '../../constants/Colors';
import { LightControl } from './LightControl';
import { TemperatureControl } from './TemperatureControl';

const useStyles = makeStyles({
  root: {
    margin: "auto auto 2rem auto",
    marginLeft: 0,
    border: "0.1px solid transparent",
    borderRadius: "40px",
    width: "25%",
    height: "50%",
    backgroundColor: "#DEDEDE"
  },
  title: {
    fontFamily: "Futura, sans-serif",
    fontWeight: "normal",
    color: COLORS.grayFont
  }
});

const lightControlsData: any[] = [
  {
    roomName: "Bedroom",
    iconUrl: "/images/bedroom.png",
    isOn: true
  },
  {
    roomName: "Kitchen",
    iconUrl: "/images/kitchen.png",
    isOn: false
  },
  {
    roomName: "Living",
    iconUrl: "/images/sofa.png",
    isOn: false
  },
  {
    roomName: "Bathroom",
    iconUrl: "/images/bathroom.png",
    isOn: false
  }
];


export function ControlCenter(props: any) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <h2 className={classes.title}>Control Center</h2>
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {lightControlsData.map((lightControl, index) => (
                  <Grid item xs={2} sm={4} md={6} key={index}>
                    {/* <Item> */}
                        <LightControl
                      title = {lightControl.roomName}
                      iconUrl = {lightControl.iconUrl}
                      isOn = {lightControl.isOn}
                      />
                    {/* </Item> */}
                  </Grid>
                ))}
                <Grid item xs={4} sm={8} md={12}>
                  <TemperatureControl />
                </Grid>
              </Grid>
      </div>
    )
}