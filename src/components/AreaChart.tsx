/* eslint:disable */
import React from 'react';
import { Line } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';
import type { ChartProps } from 'react-chartjs-2';
import { LineController, Chart } from 'chart.js';

const useStyles = makeStyles({
    root: {
        width: "100%",
    }
});

const data: any = {
  labels: ['Last Week', 'This Week'],
  datasets: [
    {
        label: '# of Votes',
        data: [3, 5],
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.1,
        borderCapStyle: 'round'
    },
]
};

const options: any = {
  scales: {
    x: {
        display: false
    },
    y: {
      beginAtZero: true,
      display: false
    },
  },
  plugins: {
    filler: {
        propagate: true
    },
    legend: {
        display: false
    }
}
};

export function AreaChart(props: any) {
    const classes = useStyles();
    const plugins: any = [{
        // beforeDraw: (chart: any) => {
        //     let ctx = chart.ctx;
        //     ctx.lineCap = "round";
        // }
        // afterDraw: function(chart: any) {
        //     let ctx = chart.ctx;
        //     var ranges = [
        //         {
        //             start: 100,
        //             end: 75,
        //             color: 'rgba(250,0,0,0.5)'
        //         },
        //         {
        //             start: 75,
        //             end: 50,
        //             color: 'rgba(0,250,0,0.5)'
        //         },
        //         {
        //             start: 50,
        //             end: 25,
        //             color: 'rgba(0,0,250,0.5)'
        //         },
        //         {
        //             start: 25,
        //             end: 0,
        //             color: 'rgba(250,250,0,0.5)'
        //         }
        //     ];
    
        //     var scale = chart.scale;
        //     var rangesStart = scale.calculateY(ranges[0].start);
        //     var rangesEnd = scale.calculateY(ranges[ranges.length - 1].end);
        //     var gradient = ctx.createLinearGradient(0, rangesStart, 0, rangesEnd);
    
        //     ranges.forEach(function (range) {
        //         gradient.addColorStop((scale.calculateY(range.start) - rangesStart) / (rangesEnd - rangesStart), range.color);
        //         gradient.addColorStop((scale.calculateY(range.end) - rangesStart) / (rangesEnd - rangesStart), range.color);
        //     })

        //   //ctx.fillRect(chart.scale.calculateX(0), chart.scale.startPoint, chart.scale.width, chart.scale.endPoint - chart.scale.startPoint);
        //   ctx.restore();
        // }
      }]

    return (
        <div className={classes.root}>
        <Line id="line-chart" data={data} options={options} plugins={plugins}/>
      </div>
    )
}

