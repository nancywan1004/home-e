/* eslint:disable */
import React, { useState, useRef } from 'react';
import { Card, CardContent, Button, CardMedia, Typography, IconButton, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { COLORS } from '../constants/Colors';

const useStyles = makeStyles({
    root: {
        margin: "2rem auto auto 5rem",
        width: "50%",
        border: "0.1px solid #707070",
        borderRadius: "20px",
        padding: "1.5rem 3.5rem 3.5rem 1.5rem"
    },
    greeting: {
        fontFamily: "utopia-std, serif",
        fontWeight: "bold",
        textAlign: "left",
        marginTop: "-0.5rem"
    },
    description: {
        marginTop: "-2rem",
        display: "flex",
        verticalAlign: "top",
        width: "60%",
        textAlign: "left"
    },
    currUtilityAmt: {
        color: COLORS.lightGreen
    }
});


export function WelcomePanel() {
    const classes = useStyles();
    const currUtility = useRef(14.12);
    return (
        <div className={classes.root}>
            <h1 className={classes.greeting}>Hello Name!</h1>
            <div className={classes.description}>
                <p>You are doing great this week, you saved ${`${currUtility.current}`} from last week, that's almost three coffees!</p>
            </div>
        </div>
    )
}