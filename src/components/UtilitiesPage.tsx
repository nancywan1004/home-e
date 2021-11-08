/* eslint:disable */
import React, { useState } from 'react';
import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { COLORS } from '../constants/Colors';
import { Bar } from 'react-chartjs-2';
import { useParams } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        margin: "2rem"
    },
    header: {
        display: "flex",
        alignItems: "flex-start",
        //textAlign: 'left',
        margin: "2.5rem 0 1rem 3rem",
    },
    title: {
        // textAlign: 'left',
        fontFamily: "Futura, sans-serif",
        fontWeight: "normal",
        color: COLORS.grayFont,
        padding: "0 0.5rem 0 0.5rem"
    },
    barChart: {
        backgroundColor: COLORS.green,
        padding: "1rem",
        margin: "auto",
        width: "90%",
        borderRadius: "20px",
        boxShadow: "0 0 0.25rem #000000"
    },
    donutCharts: {
        margin: "auto",
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

const data = {
    labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    datasets: [
        {
            label: 'This Week',
            data: [12, 19, 3],
            backgroundColor: COLORS.darkBlue,
            barPercentage: 0.7,
            xAxisID: "x1",
        },
        {
            label: 'Last Week',
            data: [2, 3, 20, 5, 1, 4],
            backgroundColor: "rgba(255,255,255, 0.3)",
            hoverBackgroundColor: "rgba(255,255,255, 0.4)",
            xAxisID: "x2",
        },
    ],
};

const options: any = {
    scales: {
        x: {
            display: true,
            title: {
              display: true,
              text: 'Date',
              color: COLORS.white
            },
            ticks: {
              major: {
                enabled: true
            },
            color: COLORS.white
            },
            grid: {
                display: false
            },
        },
        x1: {
            display: false
        },
        x2: {
            display: false
        },
        y: {
            ticks: {
                stacked: false,
                // Include a dollar sign in the ticks
                callback: function(value: any, index: any, values: any) {
                    return '$' + value;
                },
                color: COLORS.white
            }
        }
    },
    plugins: {
        legend: {
            display: true,
            position: "right"
        },
    }
}


export function UtilitiesPage() {
    const classes = useStyles();
    let params = useParams();
    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <h2 className={classes.title}>Utility Uage:</h2>
                <h2 className={classes.title}>{params.utilityType?.toUpperCase()}</h2>
            </div>
            <div className={classes.barChart}>
                <Bar data={data} options={options} />
            </div>
        </div>
    )
}