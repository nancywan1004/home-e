/* eslint:disable */
import React, { useState, useEffect } from 'react';
import { Link, MemoryRouter, Route, useNavigate } from 'react-router-dom';
import { Card, IconButton, Grid } from '@material-ui/core';
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { COLORS } from '../constants/Colors';
import { useParams } from "react-router-dom";

import { BudgetSettingPanel } from './BudgetSettingPanel';
import { RecommendationPanel } from './RecommendationPanel';

import { BarChart } from './BarChart';

const useStyles = makeStyles({
    root: {
        margin: "2rem",
    },
    header: {
        display: "flex",
        alignItems: "flex-start",
        margin: "2.5rem 0 1rem 3rem",
    },
    title: {
        fontFamily: "Futura, sans-serif",
        fontWeight: "normal",
        color: COLORS.grayFont,
        padding: "0 0.5rem 0 0.5rem"
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
        width: "40%"
    },
    utilityType: {
        fontFamily: "Futura, sans-serif",
        fontSize: "24px",
        fontWeight: "normal",
        color: COLORS.grayFont,
        marginBottom: "-2.5rem"
    },
    lowerSection: {
        width: "90%",
        margin: "auto",
        display: "inline-flex",
        justifyContent: "space-between"
    },
    bottomPagination: {
        display: "flex",
        justifyContent: "space-between"
    }
});

export function UtilitiesPage() {
    const classes = useStyles();
    let params = useParams();
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const handleChange = (event: any, value: any) => {
      setPage(value);
      switch (value) {
          case 1:
            navigate("/utilities/electricity");
            break;
          case 2:
            navigate("/utilities/water");
            break;
          case 3:
            navigate("/utilities/gas");
            break;
          default:
              break;
      }
    };
  
    useEffect(() => {
      const count = window.location.pathname.split("/").pop();
      switch (count) {
        case "":
        case "electricity":
            setPage(1);
            break;
        case "water":
            setPage(2);
            break;
        case "gas":
            setPage(3);
            break;
    }
    }, [window.location.pathname.split("/").pop()]);

    return (
        <div className={classes.root}>
            <BarChart />
            <Grid container className={classes.lowerSection}>
                <Grid item xs={6} md={6}>
                    <BudgetSettingPanel uType={params.utilityType?.toUpperCase()}/>
                </Grid>
                <Grid item xs={6} md={6}>
                <RecommendationPanel />
                </Grid>
            </Grid>
            <div className={classes.bottomPagination}>
                <IconButton onClick={() => navigate("/")} sx={{flexGrow: 1}}>
                    <ArrowBackIosNewIcon />
                </IconButton>
                <Pagination count={3} page={page} onChange={handleChange} size="large"/>
                <IconButton disabled>
                    <ArrowForwardIosIcon />
                </IconButton>
            </div>
        </div>
    )
}