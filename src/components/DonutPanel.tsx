/* eslint:disable */
import React, { useState } from 'react';
import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { COLORS } from '../constants/Colors';
import { DonutChart } from './DonutChart';
import { AreaChart } from './AreaChart';

const useStyles = makeStyles({
    title: {
        textAlign: 'left',
        margin: "2.5rem 0 -0.1rem 5rem",
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
        border: "0.1px solid #707070",
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
                label: 'Current Electricity Usage',
                percent: 100,
                backgroundColor: [COLORS.red, COLORS.white]
              },
            ],
          },
          cost: 12,
          progress: 120,
          iconUrl: "/images/electricity.png",
          fill: COLORS.red
    },
    {
        type: 'Water',
        data:
        {
            labels: ['Water Utility'],
            datasets: [
              {
                label: 'Current Water Usage',
                percent: 35,
                backgroundColor: [COLORS.lightGreen, COLORS.white]
              },
            ],
          },
          cost: 11,
          progress: 35,
          iconUrl: "/images/water.png",
          fill: COLORS.lightGreen
    },
    {
        type: "Gas",
        data:       
        {
            labels: ['Gas Utility'],
            datasets: [
              {
                label: 'Current Gas Usage',
                percent: 70,
                backgroundColor: [COLORS.yellow, COLORS.white]
              },
            ],
          },
          cost: 18,
          progress: 70,
          iconUrl: "/images/gas.png",
          fill: COLORS.yellow
    }
]


export function DonutPanel() {
    const classes = useStyles();
    return (
        <>
        <div className='header'>
        <h2 className={classes.title}>Weekly Utility Usage</h2>
      </div>
      <div className={classes.donutCharts}>
          {
              utilityData.map((utility, i) => {
                  return (
                      <div className={classes.donutChart} key={i}>
                        <h5 className={classes.utilityType}>{utility.type}</h5>
                        <DonutChart uType={utility.type} iconUrl={utility.iconUrl} cost ={utility.cost} progress={utility.progress} utilityData={utility.data}/>
                        <AreaChart fill={utility.fill}/>
                    </div>
                  )
          })
        }
      </div>
      {/* <Doughnut data={data} /> */}
      </>
    )
}