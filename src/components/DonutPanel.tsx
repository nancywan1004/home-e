/* eslint:disable */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import { COLORS } from '../constants/Colors';
import { DonutChart } from './DonutChart';
import { AreaChart } from './AreaChart';

const useStyles = makeStyles({
    root: {
        margin: "auto"
    },
    title: {
        textAlign: 'left',
        margin: "2.5rem 0 -0.1rem 2.5rem",
        fontFamily: "Futura, sans-serif",
        fontWeight: "normal",
        color: COLORS.grayFont
    },
    donutCharts: {
        margin: "1rem auto 2rem auto",
        width: "90%",
        display: "flex",
        justifyContent: "center"
    },
    donutChart: {
        margin: "1rem",
        backgroundColor: COLORS.whiteBackground,
        border: "0.1px solid #70707020",
        borderRadius: "40px",
        // boxShadow: "1px 2px #888888",
        width: "40%"
    },
    utilityType: {
        fontFamily: "Futura, sans-serif",
        fontSize: "24px",
        fontWeight: "normal",
        color: COLORS.grayFont,
        marginBottom: "-2.5rem"
    }
});


const utilityData: any[] = [
    {
        type: "Electricity",
        data:
        {
            labels: ['Electricity Utility'],
            datasets: [
              {
                label: 'Current Electricity Percentage',
                percent: 120,
                backgroundColor: [COLORS.red, COLORS.white]
              },
            ],
          },
          lineData: {
            labels: ['Last Week', 'This Week'],
            datasets: [
              {
                  label: 'Total cost',
                  data: [10, 12],
                  fill: false,
                  backgroundColor: COLORS.red,
                  borderColor: COLORS.red + "80",
                  tension: 1,
              },
          ]
          },
          cost: 12,
          target: 10,
          iconUrl: "/images/electricity.png"
    },
    {
        type: 'Water',
        data:
        {
            labels: ['Water Utility'],
            datasets: [
              {
                label: 'Current Water Percentage',
                percent: 35,
                backgroundColor: [COLORS.lightGreen, COLORS.white]
              },
            ],
          },
          lineData: {
            labels: ['Last Week', 'This Week'],
            datasets: [
              {
                  label: 'Total cost',
                  data: [20, 11],
                  fill: false,
                  backgroundColor: COLORS.lightGreen,
                  borderColor: COLORS.lightGreen + "80",
                  tension: 1,
              },
          ]
          },
          cost: 11,
          target: 31,
          iconUrl: "/images/water.png"
    },
    {
        type: "Gas",
        data:       
        {
            labels: ['Gas Utility'],
            datasets: [
              {
                label: 'Current Gas Percentage',
                percent: 70,
                backgroundColor: [COLORS.yellow, COLORS.white]
              },
            ],
          },
          lineData: {
            labels: ['Last Week', 'This Week'],
            datasets: [
              {
                  label: 'Total cost',
                  data: [18, 18],
                  fill: false,
                  backgroundColor: COLORS.yellow,
                  borderColor: COLORS.yellow + "80",
                  tension: 1,
              },
          ]
          } ,
          cost: 18,
          target: 25,
          iconUrl: "/images/gas.png"
    }
]


export function DonutPanel() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
        <h2 className={classes.title}>Weekly Utility Cost</h2>
      <div className={classes.donutCharts}>
          {
              utilityData.map((utility, i) => {
                  return (
                      <div className={classes.donutChart} key={i}>
                        <h5 className={classes.utilityType}>{utility.type}</h5>
                        <DonutChart uType={utility.type} iconUrl={utility.iconUrl} cost ={utility.cost} target={utility.target} utilityData={utility.data}/>
                        <AreaChart lineData={utility.lineData}/>
                    </div>
                  )
          })
        }
      </div>
      </div>
    )
}