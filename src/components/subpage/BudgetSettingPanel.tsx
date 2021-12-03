/* eslint:disable */
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, Button, Grid, CardMedia, Typography, IconButton, Menu, MenuItem, Modal, Box } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { COLORS } from '../../constants/Colors';
import { BudgetSettingPopup } from './BudgetSettingPopup';

const useStyles = makeStyles({
    root: {
        margin: "2rem 1rem auto 2rem",
        backgroundColor: COLORS.whiteBackground,
        //width: "60%",
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
    description: {
        //marginTop: "-2rem",
        display: "flex",
        justifyContent: 'center',
        width: "60%",
        //textAlign: "left",
        fontSize: "36px",
        fontFamily: "Futura, sans-serif",
        fontWeight: "normal"
    },
    currUtilityAmt: {
        color: COLORS.lightGreen
    },
    budgetBody: {
        display: "flex",
        justifyContent: "space-evenly"
    },
    budgetUsage: {
        display: "flex",
        justifyContent: "space-evenly",
    }
});

const StyledButton = withStyles({
    root: {
      margin: "auto auto auto 4rem",
      borderRadius: "20px",
      padding: "1rem 1rem 1rem 1rem",
      fontSize: "24px",
      fontFamily: "Futura, sans-serif",
      fontWeight: "bold",
      backgroundColor: COLORS.green,
      color: COLORS.white,
      '&:hover': {
        backgroundColor: COLORS.green,
    },
  }})(Button);

const utilityBudget: any[] = [
    {
        type: "ELECTRICITY",
        budget: 17.50
    },
    {
        type: "WATER",
        budget: 14.00
    },
    {
        type: "GAS",
        budget: 12.00
    }
]

export function BudgetSettingPanel(props: any) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [budget, setBudget] = useState(null);
    const [coffee, setCoffee] = useState(0.00);
    const handleBudgetSetting: any = (newBudget: any, newCoffee: any) => {
        console.log("newCoffee is: " + newCoffee);
        setBudget(newBudget);
        setCoffee(newCoffee);
    }
    useEffect(() => {
        let utilityObj: any = utilityBudget.find((elem) => elem.type === props.uType);
        setBudget(utilityObj?.budget.toFixed(2));
    }, [props.uType])
    return (
        <div className={classes.root}>
            <h1 className={classes.greeting}>{props.uType + " Budget Limit"}</h1>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item xs={6} md={5} className={classes.description}>
                    <h2 style={{color: COLORS.green}}>${budget}</h2>
                    <p style={{alignSelf: "flex-end", color: COLORS.grayFont}}>/week</p>
                </Grid>
                <Grid item xs={3} md={4}>
                <StyledButton onClick={() => handleOpen()}>Change</StyledButton>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                <BudgetSettingPopup budget={budget} coffee={coffee} handlePopupClose={handleClose} handleBudgetSetting={(newBudget: any, newCoffee: any) => handleBudgetSetting(newBudget, newCoffee)}></BudgetSettingPopup>
                </Modal>
                </Grid>
            </Grid>
            <div className={classes.budgetUsage}>
                <Box sx={{color: COLORS.grayFont, fontFamily: "Futura, sans-serif", padding: "-1rem 0 -1rem 0"}}>
                    <h2 style={{fontWeight: "bold" }}>${8.00.toFixed(2)}</h2>
                    <p style={{alignSelf: "flex-end", fontWeight: "normal", marginLeft: "1rem"}}>This Week</p>
                </Box>
                <Box sx={{color: COLORS.grayFont, fontFamily: "Futura, sans-serif", padding: "-1rem 0 -1rem 0"}}>
                    <h2 style={{ fontWeight: "bold" }}>${8.10.toFixed(2)}</h2>
                    <p style={{alignSelf: "flex-end", fontWeight: "normal", marginLeft: "1rem"}}>Last Week</p>
                </Box>
            </div>
        </div>
    )
}