import React, { useState } from 'react';
import { Card, CardContent, Button, CardMedia, Grid, Typography, IconButton, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Outlet, Link } from "react-router-dom";

import { Doughnut } from 'react-chartjs-2';
import { COLORS } from '../constants/Colors';

const useStyles = makeStyles({
  root: {
    marginBottom: "-2rem"
  },
  remaining: {
    marginTop: "-2rem"
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
        let fontSize = (height / 300).toFixed(2);
        ctx.font = fontSize + "rem Futura, sans-serif";
        ctx.textBaseline = "top";
        let costText = "$" + props.cost.toFixed(2),
        costTextX = Math.round((width - ctx.measureText(costText).width) / 2),
        costTextY = height / 1.75;
        let remainingText = `$${props.target - props.cost < 0 ? 0.00.toFixed(2) : (props.target - props.cost).toFixed(2)} remaining`,
        remainingTextX = Math.round((width - ctx.measureText(remainingText).width) / 2),
        remainingTextY = height / 1.25;
        let icon = new Image();
        icon.src = props.iconUrl;
        ctx.drawImage(icon, width / 2.25, height / 2.45, width / 10, height / 8);
        ctx.fillText(costText, costTextX, costTextY);
        ctx.fillText(remainingText, remainingTextX, remainingTextY);
        ctx.save();
      },
      beforeInit: (chart: any) => {
        const dataset = chart.data.datasets[0];
        chart.data.labels = [dataset.label];
        dataset.data = [dataset.percent, 100 - dataset.percent < 0 ? 0 : 100 - dataset.percent];
      }
    }]

    const options: any = {
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          filter: function(tooltipItem: any) {
            return !!tooltipItem.label;
          },
          callbacks: {
            label: function(chart: any) {
              var dataset = chart.dataset;
              var currentValue = dataset.data[chart.datasetIndex];
              return currentValue + '%';
            }
          }
        },
      },
      cutout: "75%",
      radius: "50%",
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