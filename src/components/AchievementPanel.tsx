import { Grid, Box, Card, CardContent, CardActions, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { COLORS } from '../constants/Colors';

const useStyles = makeStyles({
    root: {
        width: "100%",
        margin: "2rem auto auto auto",
        backgroundColor: COLORS.whiteBackground,
        border: "0.1px solid #70707020",
        borderRadius: "40px",
        padding: "0 0 1rem 1rem"
    },
    title: {
        textAlign: "left",
    },
    readMoreBtn: {
        color: COLORS.green,
        fontFamily: "Helvetica Neue",
        fontWeight: "bold",
        fontSize: "1rem",
        backgroundColor: "transparent",
        float: "right"
    },
    lowerText: {
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        textAlign: "left",
    }
});

export function AchievementPanel() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <h2 className={classes.title}>Achievements</h2>
            <Grid container>
                <Grid item xs={4} md={4}>
                <img src="/images/badges/electricity-10P.png" width="80%"></img>
                </Grid>
                <Grid item xs={8} md={8} className={classes.lowerText}>                    
                <h2>On Progress</h2>
                <span>You are so close! Stay below your budget limit one time!</span>
                </Grid>
            </Grid>
        </div>
    )
}