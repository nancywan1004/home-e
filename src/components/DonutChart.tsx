import React, { useState } from 'react';
import { Card, CardContent, Button, CardMedia, Typography, IconButton, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Outlet, Link } from "react-router-dom";

import { Doughnut } from 'react-chartjs-2';
import { COLORS } from '../constants/Colors';

const useStyles = makeStyles({
  root: {
    marginBottom: "-3rem"
  },
  remaining: {
    marginTop: "-1rem"
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
        let costText = "$" + props.cost,
        costTextX = Math.round((width - ctx.measureText(costText).width) / 2),
        costTextY = height / 1.8;
        let remainingText = `$${props.target - props.cost < 0 ? 0 : props.target - props.cost} remaining`,
        remainingTextX = Math.round((width - ctx.measureText(remainingText).width) / 2),
        remainingTextY = height / 1.3;
        let icon = new Image();
        icon.src = props.iconUrl;
        ctx.drawImage(icon, width / 2.2, height / 2.35, width / 12, height / 10);
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