/* eslint:disable */
import React from 'react';
import { Line } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';
import type { ChartProps } from 'react-chartjs-2';
import { LineController, Chart } from 'chart.js';
import { COLORS } from '../constants/Colors';

const useStyles = makeStyles({
    root: {
        width: "100%",
    }
});

const options: any = {
  scales: {
    x: {
        display: false
    },
    y: {
      beginAtZero: true,
      display: false
    },
  },
  plugins: {
    filler: {
        propagate: true
    },
    legend: {
        display: false
    }
}
};

const fillColor: any = (lastWeek: any, thisWeek: any) => {
    const diff = thisWeek.y - lastWeek.y;
    if (diff > 0) return COLORS.lightGreen;
    if (diff < 0) return COLORS.red;
    if (diff === 0) return COLORS.yellow;
  }  

export function AreaChart(props: any) {
    const classes = useStyles();

    const plugins: any = [{
        beforeDraw: function(chart: any) {
          let width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
          let meta = chart.getDatasetMeta(0);
          let lastWeekDatapoint = meta.data[0];
          let thisWeekDatapoint = meta.data[1];
          ctx.restore();
          ctx.beginPath();
          ctx.moveTo(lastWeekDatapoint.x - 0.05 * width, lastWeekDatapoint.y);           // Create a starting point
          if (lastWeekDatapoint.y <= thisWeekDatapoint.y) {
            ctx.lineTo(lastWeekDatapoint.x - 0.05 * width, lastWeekDatapoint.y + height * 0.35);          // Create a horizontal line
            ctx.arcTo(lastWeekDatapoint.x - 0.05 * width, lastWeekDatapoint.y + height, lastWeekDatapoint.x + width * 0.3, lastWeekDatapoint.y + height, 60); // Create an arc
            ctx.lineTo(lastWeekDatapoint.x + width * 0.5, lastWeekDatapoint.y + height);         // Continue with vertical line
            ctx.arcTo(lastWeekDatapoint.x + width, lastWeekDatapoint.y + height, lastWeekDatapoint.x + width, lastWeekDatapoint.y + height * 0.35, 55);
          } else {
            ctx.lineTo(lastWeekDatapoint.x - 0.05 * width, lastWeekDatapoint.y + height * 0.35);          // Create a horizontal line
            ctx.arcTo(lastWeekDatapoint.x - 0.05 * width, lastWeekDatapoint.y + height * 0.9, lastWeekDatapoint.x + width * 0.5, lastWeekDatapoint.y + height * 0.9, 80); // Create an arc
            ctx.lineTo(lastWeekDatapoint.x + width * 0.5, lastWeekDatapoint.y + height * 0.9);         // Continue with vertical line
            ctx.arcTo(lastWeekDatapoint.x + width, lastWeekDatapoint.y + height * 0.9, lastWeekDatapoint.x + width, lastWeekDatapoint.y + height * 0.35, 70);
          }
          ctx.lineTo(lastWeekDatapoint.x + width, thisWeekDatapoint.y);
          ctx.fillStyle = fillColor(lastWeekDatapoint, thisWeekDatapoint) + "40";
          ctx.fill();
          ctx.save();
        },
      }]

    return (
        <div className={classes.root}>
        <Line id="line-chart" data={props.lineData} options={options} plugins={plugins}/>
      </div>
    )
}

