import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Card, CardContent, CardActions, Button, Typography } from '@material-ui/core';
import { COLORS } from '../constants/Colors';

const useStyles = makeStyles({
    root: {
        margin: "auto",
        display: "flex"
    },
    readMoreBtn: {
        color: COLORS.blueFont,
        fontFamily: "Helvetica Neue",
        fontWeight: "bold",
        fontSize: "18px",
        backgroundColor: "transparent",
        float: "right"
    }
});

export function RecommendationCard(props: any) {
    const classes = useStyles();
    const card = (
        <React.Fragment>
        <CardContent>
            <h2>{props.title}</h2>
            <h5>{props.subtitle}</h5>
        </CardContent>
        <CardActions>
          <Button size="small" className={classes.readMoreBtn}>Read More</Button>
        </CardActions>
      </React.Fragment>
    )

    return (
      <Box className={classes.root}>
        <Card variant="outlined">{card}</Card>
      </Box>
    )
}