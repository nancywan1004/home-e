/* eslint:disable */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import { COLORS } from '../constants/Colors';
import { DonutChart } from './DonutChart';
import { AreaChart } from './AreaChart';
import { RecommendationCard } from './RecommendationCard';

const useStyles = makeStyles({
    root: {
        margin: "2rem auto auto 2rem",
        backgroundColor: COLORS.grayBackground,
        border: "0.1px solid #70707020",
        borderRadius: "20px",
        padding: "1.5rem 1.5rem 1.5rem 1.5rem"
    },
    greeting: {
        fontFamily: "Futura, sans-serif",
        color: COLORS.grayFont,
        fontWeight: "bold",
        textAlign: "left",
        marginTop: "-0.5rem"
    },
    recommendations: {
        margin: "1rem auto 1rem auto",
        width: "100%",
        overflowX: "scroll",
        display: "flex",
        justifyContent: "center"
    },
    recommendation: {
        margin: "1rem",
        backgroundColor: COLORS.whiteBackground,
        border: "0.1px solid #70707020",
        borderRadius: "40px",
        height: "100%"
        // boxShadow: "1px 2px #888888",
        //width: "40%"
    },
    utilityType: {
        fontFamily: "Futura, sans-serif",
        fontSize: "24px",
        fontWeight: "normal",
        color: COLORS.grayFont,
        marginBottom: "-2.5rem"
    }
});


const recommendationData: any[] = [
    {
        title: "Cook up Energy Savings",
        subtitle: "Use a smaller pan if possible and put a lid on it so the food cooks faster. Simple things in the kitchen can save on natural gas bills. "
    },
    {
        title: "Smart Thermostats",
        subtitle: "Invest in a Smart Thermostat , you can program a smart thermostat to adjust the heat to your particular schedule."
    }
       
]


export function RecommendationPanel() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
        <h1 className={classes.greeting}>Recommendations</h1>
        {/* <Grid container spacing={2} alignItems="center" justifyContent="center"> */}
            <div className={classes.recommendations}>
            {
                recommendationData.map((rec, i) => {
                    return (
                        <div className={classes.recommendation} key={i}>
                            <RecommendationCard title={rec.title} subtitle={rec.subtitle}/>
                        </div>
                    )
            })
            }
        </div>
        {/* </Grid> */}
      </div>
    )
}