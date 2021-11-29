import React, { useState, useRef, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core"
import { Bar } from 'react-chartjs-2';
import { COLORS } from '../constants/Colors';
import { Chart } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Card, Button, Tabs, Tab, Grid } from '@material-ui/core';

Chart.register(annotationPlugin);

const useStyles = makeStyles({
    barChart: {
        backgroundColor: COLORS.green,
        padding: "1rem",
        margin: "auto",
        width: "90%",
        borderRadius: "20px",
        boxShadow: "0 0 0.25rem #000000"
    },
    timeTabs: {
        display: "flex",
        float: "right",
    },
    timeTab: {
        color: COLORS.white,
        "&:active": {
            fontWeight: "bold",
        },
        padding: "0 0.5rem 0 0.5rem",
        minHeight: 0,
        minWidth: 0,
    },
})

const dailyData: any = {
    labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    datasets: [
        {
            label: 'This Week',
            data: [12, 19, 3],
            backgroundColor: COLORS.darkBlue,
            barPercentage: 0.7,
            xAxisID: "x1",
            datalabels: {
                anchor: "end",
                align: "end",
                color: COLORS.darkBlue,
                display: (context: any) => {
                    //console.log(context.dataset.data.length - 1);
                    return context.dataIndex === context.dataset.data.length - 1; 
                }
            }
        },
        {
            label: 'Last Week',
            data: [2, 3, 20, 5, 1, 4],
            backgroundColor: "rgba(255,255,255, 0.3)",
            hoverBackgroundColor: "rgba(255,255,255, 0.4)",
            xAxisID: "x2",
            datalabels: {
                anchor: "end",
                align: "end",
                display: (context: any) => {
                    return false; 
                }
            }
        },
    ],
};

const weeklyData: any = {
    labels: ['1-7', '8-14', '15-21', '22-28'],
    datasets: [
        {
            label: 'This Month',
            data: [13.5, 8, 8],
            backgroundColor: COLORS.darkBlue,
            barPercentage: 0.7,
            xAxisID: "x1",
            datalabels: {
                anchor: "end",
                align: "end",
                color: COLORS.darkBlue,
                display: (context: any) => {
                    //console.log(context.dataset.data.length - 1);
                    return context.dataIndex === context.dataset.data.length - 1; 
                }
            }
        },
        {
            label: 'Last Month',
            data: [12, 7.5, 6.5, 6],
            backgroundColor: "rgba(255,255,255, 0.3)",
            hoverBackgroundColor: "rgba(255,255,255, 0.4)",
            xAxisID: "x2",
            datalabels: {
                anchor: "end",
                align: "end",
                display: (context: any) => {
                    return false; 
                }
            }
        },
    ],
};

const monthlyData: any = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
        {
            label: 'This Year',
            data: [70, 68, 60, 65, 63, 64, 60],
            backgroundColor: COLORS.darkBlue,
            barPercentage: 0.7,
            xAxisID: "x1",
                        datalabels: {
                anchor: "end",
                align: "end",
                color: COLORS.darkBlue,
                display: (context: any) => {
                    //console.log(context.dataset.data.length - 1);
                    return context.dataIndex === context.dataset.data.length - 1; 
                }
            }
        },
        {
            label: 'Last Year',
            data: [68, 75, 70, 64, 73, 63, 75, 71, 52, 45, 71, 52],
            backgroundColor: "rgba(255,255,255, 0.3)",
            hoverBackgroundColor: "rgba(255,255,255, 0.4)",
            xAxisID: "x2",
            datalabels: {
                anchor: "end",
                align: "end",
                display: (context: any) => {
                    return false; 
                }
            }
        },
    ],
}

export function BarChart() {
    const classes = useStyles();
    let params = useParams();
    const [data, setData] = useState(dailyData);
    const [budgetLimitAnnotation, setBudgetLimitAnnotation] = useState({
        type: 'line',
        scaleID: 'y',
        value: 11,
        borderColor: COLORS.budgetLimitYellow,
        borderWidth: 5,
        borderDash: [15,30],
        label: {
          backgroundColor: 'transparent',
          content: 'Budget Limit',
          enabled: true,
          position: 'end',
          xAdjust: 90,
          textAlign: 'right',
          color: COLORS.budgetLimitYellow
        },
        click: function({chart, element}: any) {
          console.log('Line annotation clicked');
        }
      });
    const [averageAnnotation, setAverageAnnotation] = useState({
        type: 'line',
        scaleID: 'y',
        value: 14,
        borderColor: COLORS.white,
        borderWidth: 5,
        borderDash: [15,30],
        label: {
          backgroundColor: 'transparent',
          content: 'Area Average',
          enabled: true,
          position: 'end',
          xAdjust: 70,
          textAlign: 'right'
        },
        click: function({chart, element}: any) {
          console.log('Line annotation clicked');
        }
      });

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
                    color: COLORS.white,
                },
                grid: {
                    //drawBorder: false,
                    color: COLORS.white + "50",
                    borderColor: COLORS.white + "50"
                },
            }
        },
        plugins: {
            legend: {
                display: true,
                position: "right",
                align: 'end',
                labels: {
                    color: COLORS.white
                }
            },
            annotation: {
                annotations: {
                    budgetLimitAnnotation,
                    averageAnnotation
                }
              }
        }};

    const barChart: any = useRef();
    useEffect(() => {
        console.log(barChart.current);
        // barChart.current.options.annotation.annotations = {
        //     budgetLimitAnnotation,
        //     averageAnnotation
        // }
        barChart.current.update();
    }, [budgetLimitAnnotation, averageAnnotation])
    const handleChange = (event: any, newValue: any) => {
        //console.log(newValue.labels);
        setData(newValue);
        switch (newValue.labels) {
            case 7:
                setBudgetLimitAnnotation({...budgetLimitAnnotation, value: 11});
                setAverageAnnotation({...averageAnnotation, value: 14});
                break;
            case 4:
                setBudgetLimitAnnotation({...budgetLimitAnnotation, value: 12});
                setAverageAnnotation({...averageAnnotation, value: 13.5});
                break;
            case 12:
                setBudgetLimitAnnotation({...budgetLimitAnnotation, value: 42});
                setAverageAnnotation({...averageAnnotation, value: 60});
                break;
            default:
                break;
        }
        //setOptions()
       // console.log(barChart);
    };
    return (
        <div className={classes.barChart}>
        <Tabs value={data}  onChange={handleChange} className={classes.timeTabs} TabIndicatorProps={{style: {display: "none"}}}>
            <Tab className={classes.timeTab} value={dailyData} label="Day" />
            <Tab className={classes.timeTab} value={weeklyData} label="Week" />
            <Tab className={classes.timeTab} value={monthlyData} label="Month" />
        </Tabs>
        <Bar data={data} options={options} plugins={[ChartDataLabels] as any} ref={barChart}/>
    </div>
    )
}