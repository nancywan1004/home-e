/* eslint:disable */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { COLORS } from '../../constants/Colors';
import { RecommendationCard } from './RecommendationCard';

const useStyles = makeStyles({
    root: {
        margin: "2rem 0 0 2rem",
        backgroundColor: COLORS.grayBackground,
        border: "0.1px solid #70707020",
        borderRadius: "20px",
        padding: "1.5rem 1.5rem 1.5rem 1.5rem"
    },
    greeting: {
        fontFamily: "Futura, sans-serif",
        color: COLORS.black,
        fontWeight: "bold",
        textAlign: "left",
        marginTop: "-0.5rem"
    },
    recommendations: {
        margin: "1rem auto 1rem auto",
        width: "100%",
        overflowX: "scroll",
        display: "flex",
        justifyContent: "center",
    },
    recommendation: {
        margin: "0.5rem",
        backgroundColor: "#011E4479",
        border: "0.1px solid #70707020",
        borderRadius: "40px",
        height: "100%",
        padding: "0 1rem 0 1rem",
    },
    utilityType: {
        fontFamily: "Futura, sans-serif",
        fontSize: "24px",
        fontWeight: "normal",
        color: COLORS.black,
        marginBottom: "-2.5rem"
    }
});


const recommendationData: any[] = [
    {
        type: "electricity",
        title: "Turn off unnecessary lights",
        subtitle: "Two 100-watt incandescent bulbs switched off an extra two hours per day could save you $15 over a year. Better yet, switch to LED."
    },
    {
        type: "electricity",
        title: "Turn off the air conditioner",
        subtitle: "Turn off that old window unit air conditioner for five hours a day while you're away. Do that for 60 days over a summer and you'll save $16."
    },
    {
        type: "water",
        title: "Take shorter showers",
        subtitle: "Hot water is expensive. If two people in your home cut their shower time by a minute each, you could save $30 over a year."
    },
    {
        type: "water",
        title: "Fix that leaky faucet",
        subtitle: "Fixing a hot water leak in your faucet can save up to $9 per year in energy costs. Learn how to fix that leak."
    },
    {
        type: "gas",
        title: "Cook up Energy Savings",
        subtitle: "Use a smaller pan if possible and put a lid on it so the food cooks faster. Simple things in the kitchen can save on natural gas bills. "
    },
    {
        type: "gas",
        title: "Smart Thermostats",
        subtitle: "Invest in a Smart Thermostat , you can program a smart thermostat to adjust the heat to your particular schedule."
    }
       
]


export function RecommendationPanel(props: any) {
    const classes = useStyles();
    const uTypeRecommendationData: any[] = recommendationData.filter((elem) => {
        return props.uType === elem.type;
    });
    return (
        <div className={classes.root}>
        <h1 className={classes.greeting}>Recommendations</h1>
        {/* <Grid container spacing={2} alignItems="center" justifyContent="center"> */}
            <div className={classes.recommendations}>
            {
                uTypeRecommendationData.map((rec, i) => {
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