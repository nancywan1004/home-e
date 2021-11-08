import React, { useState } from 'react';
import { Card, CardContent, Button, CardMedia, Typography, IconButton, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Outlet, Link } from "react-router-dom";

import { Doughnut } from 'react-chartjs-2';
import { COLORS } from '../constants/Colors';

const useStyles = makeStyles({
  root: {
    marginBottom: "-5rem"
  }
});


export function DonutChart(props: any) {
    const classes = useStyles();
    const plugins: any = [{
      beforeDraw: function(chart: any) {
        let width = chart.width,
        height = chart.height,
        ctx = chart.ctx;
        ctx.restore();
        let fontSize = (height / 360).toFixed(2);
        ctx.font = fontSize + "rem Futura, sans-serif";
        ctx.textBaseline = "top";
        let titleText = props.progress + "%",
        textX = Math.round((width - ctx.measureText(titleText).width) / 2),
        textY = height / 1.8;
        let icon = new Image();
        icon.src = props.iconUrl;
        ctx.drawImage(icon, width / 2.15, height / 2.25, width / 15, height / 12);
        ctx.fillText(titleText, textX, textY);
        ctx.save();
      },
      beforeInit: (chart: any) => {
        const dataset = chart.data.datasets[0];
        chart.data.labels = [dataset.label];
        dataset.data = [dataset.percent, 100 - dataset.percent];
      }
    }]

    const options = {
      plugins: {
        legend: {
          display: false
        }
      },
      tooltips: {
        filter: (tooltipItem: any) => tooltipItem.index == 0
      },
      cutout: "75%",
      radius: "40%",
      rotation: Math.PI * -0.5
    }
    return (
        <div className={classes.root}>
          <Link to={`/utilities/${props.uType.toLowerCase()}`}>
            <Doughnut data={props.utilityData} width={100} height={100} options={options} plugins={plugins}/>
          </Link>
          <Outlet />
      </div>
    )
}