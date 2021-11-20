/* eslint:disable */
import React, { useState, useRef } from 'react';
import { Card, CardContent, Button, CardMedia, Typography, IconButton, Menu, MenuItem, Modal, Box } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { COLORS } from '../constants/Colors';
import { BudgetSettingPopup } from './BudgetSettingPopup';

const useStyles = makeStyles({
    root: {
        margin: "2rem auto auto 2rem",
        backgroundColor: COLORS.whiteBackground,
        width: "40%",
        border: "0.1px solid #70707020",
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
        justifyContent: 'flex-end',
        width: "60%",
        textAlign: "left",
        fontSize: "36px",
        fontFamily: "Futura, sans-serif",
        fontWeight: "normal"
    },
    currUtilityAmt: {
        color: COLORS.lightGreen
    },
    budgetBody: {
        display: "flex",
        justifyContent: "space-between"
    }
});

const StyledButton = withStyles({
    root: {
      borderRadius: "20px",
      padding: "-1rem 1rem -1rem 1rem",
      fontSize: "24px",
      fontFamily: "Futura, sans-serif",
      fontWeight: "bold",
      backgroundColor: COLORS.green,
      color: COLORS.white,
      '&:hover': {
        backgroundColor: COLORS.green,
    },
  }})(Button);

export function BudgetSettingPanel(props: any) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [budget, setBudget] = useState(12.00);
    return (
        <div className={classes.root}>
            <h1 className={classes.greeting}>{props.uType + " Budget Limit"}</h1>
            <div className={classes.budgetBody}>
                <div className={classes.description}>
                    <h2 style={{color: COLORS.green}}>$ {budget.toFixed(2)}</h2>
                    <p style={{alignSelf: 'flex-end', color: COLORS.grayFont}}>/week</p>
                </div>
                <StyledButton onClick={() => handleOpen()}>Change</StyledButton>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                <BudgetSettingPopup budget={budget} handlePopupClose={handleClose}></BudgetSettingPopup>
                </Modal>
            </div>
        </div>
    )
}