import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Modal, Button, Typography } from '@material-ui/core';
import { COLORS } from '../../constants/Colors';
import { RecommendationPopup } from './RecommendationPopup';

const useStyles = makeStyles({
    root: {
        margin: "auto",
    },
    readMoreBtn: {
        color: "#E2F7F8",
        fontFamily: "Helvetica Neue",
        fontWeight: "normal",
        fontSize: "0.8rem",
        float: "right",
        padding: "0.5rem"
    },
    title: {
      fontFamily: "Futura, sans-serif",
      color: COLORS.white,
    },
    subtitle: {
      fontFamily: "Futura, sans-serif",
      color: COLORS.white,
      fontSize: "1rem",
      marginBottom: "1rem"
    },
    popUp: {
      backgroundColor: COLORS.white,
      borderRadius: "40px",
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      padding: "2rem",
    }
});

export function RecommendationCard(props: any) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
      <Box className={classes.root}>
          <h3 className={classes.title}>{props.title}</h3>
          <span className={classes.subtitle}>{props.subtitle}</span>
          <Button size="small" className={classes.readMoreBtn} onClick={handleOpen}>Read More</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div className={classes.popUp}>
              <RecommendationPopup handleClose={handleClose}/>
            </div>
          </Modal>
      </Box>
    )
}