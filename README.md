<div align="center">
  <a href="https://github.com/nancywan1004/home-e">
    <img src="public/images/HomeE_logo.png" alt="Logo" width="90" height="30">
  </a>

<h3 align="center">HomeE</h3>

  <p align="center">
    A smart home application that brings you new ways to track consumption cost and practice sustainable living.
    <br />
    <a href="https://github.com/github_username/repo_name"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://master.d2rjlopzu9lfdm.amplifyapp.com/">View Demo</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

HomeE, is a smart home system that could be integrated into smart home devices like Google Nest Hub and other computer appliances including mobile and web-based user interfaces. The current technical prototype is delivered as a web application to promote the concept but also prove the potential for future development.  

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

Front End
* [React.js 17.0.2](https://reactjs.org/)
* [Chart.js 3.6.0](https://www.chartjs.org/docs/latest/)
* [Material-UI 5.0.6](https://mui.com/)

Back End(NOT doing but already setup)
* [AWS AppSync](https://aws.amazon.com/appsync/)

Deployment
* [AWS Amplify 4.3.4](https://sandbox.amplifyapp.com/getting-started)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running, please follow these simple steps below.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/nancywan1004/home-e.git
   ```
2. Install NPM packages
   ```sh
   npm install --all
   ```
3. Run the project
   ```sh
   npm start
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

### Chart Drawing with Chartjs API
#### Rings
The utility rings were drawn based on the DonutChart of Chartjs, while requiring extra plugin and option configurations to customize the default chart(e.g. display the texts inside the circle). 

Here's the sample code in `src/components/DonutChart.tsx`
<table>
<tr>
<th>Plugins</th>
<th>Options</th>
</tr>
<tr>
<td>

```js
    const plugins: any = [{
      beforeDraw: function(chart: any) {
        let width = chart.width,
        height = chart.height,
        ctx = chart.ctx;
        ctx.restore();
        let fontSize = (height / 300).toFixed(2);
        ctx.font = fontSize + "rem Futura, sans-serif";
        ctx.textBaseline = "top";
        // Text for current week's cost
        let costText = "$" + props.cost.toFixed(2),
        costTextX = Math.round((width - ctx.measureText(costText).width) / 2),
        costTextY = height / 1.75;
        // Text for this week's remaining value(i.e. budget - current cost)
        let remainingText = `$${props.target - props.cost < 0 ? 0.00.toFixed(2) : (props.target - props.cost).toFixed(2)} remaining`,
        remainingTextX = Math.round((width - ctx.measureText(remainingText).width) / 2),
        remainingTextY = height / 1.25;
        // Icon image for the utility type
        let icon = new Image();
        icon.src = props.iconUrl;
        ctx.drawImage(icon, width / 2.25, height / 2.45, width / 10, height / 8);
        ctx.fillText(costText, costTextX, costTextY);
        ctx.fillText(remainingText, remainingTextX, remainingTextY);
        ctx.save();
      },
      beforeInit: (chart: any) => {
        const dataset = chart.data.datasets[0];
        chart.data.labels = [dataset.label];
        dataset.data = [dataset.percent, 100 - dataset.percent < 0 ? 0 : 100 - dataset.percent];
      }
    }]
```
                                                                                                                                   
</td>
<td>

```js
    const options: any = {
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          filter: function(tooltipItem: any) {
            return !!tooltipItem.label;
          },
          callbacks: {
            label: function(chart: any) {
              var dataset = chart.dataset;
              var currentValue = dataset.data[chart.datasetIndex];
              return currentValue + '%';
            }
          }
        },
      },
      cutout: "75%",
      radius: "50%",
      rotation: Math.PI * -0.5
    }
```

</td>
</tr>
</table>

```js
<Doughnut data={props.utilityData} width={100} height={100} options={options} plugins={plugins}/>
```

#### Shaded Area
The shaded area under each ring indicating the weekly utility trend was created based on LineChart of Chartjs. One big challenge of using the AreaChart directly was to fill the area while retaining the round corner of the card container. This would then require a workaround using the native Canvas [`arcTo() method`](https://www.w3schools.com/tags/canvas_arcto.asp) for articulated area calculations. The drawing time of this shaded area occurs at the `beforeDraw` stage. For more information on the rendering pipeline of the plugins, please refer to [Rendering Documentations](https://www.chartjs.org/docs/latest/developers/plugins.html#rendering).  

Here's the sample code in `src/components/AreaChart.tsx`:
```js
    const plugins: any = [{
        beforeDraw: function(chart: any) {
          let width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
          let meta = chart.getDatasetMeta(0);
          let lastWeekDatapoint = meta.data[0];
          let thisWeekDatapoint = meta.data[1];
          ctx.restore();
          ctx.beginPath();
          // Create a starting point
          ctx.moveTo(lastWeekDatapoint.x - 0.05 * width, lastWeekDatapoint.y);
          if (lastWeekDatapoint.y <= thisWeekDatapoint.y) {
            // Create left vertical line
            ctx.lineTo(lastWeekDatapoint.x - 0.05 * width, lastWeekDatapoint.y + height * 0.35);
            // Create left bottom arc
            ctx.arcTo(lastWeekDatapoint.x - 0.05 * width, lastWeekDatapoint.y + height, lastWeekDatapoint.x + width * 0.3, lastWeekDatapoint.y + height, 60);
            // Continue wiht horizontal line
            ctx.lineTo(lastWeekDatapoint.x + width * 0.5, lastWeekDatapoint.y + height);
            // Create right bottom arc
            ctx.arcTo(lastWeekDatapoint.x + width, lastWeekDatapoint.y + height, lastWeekDatapoint.x + width, lastWeekDatapoint.y + height * 0.35, 55);
          } else {
            // Create left vertical line
            ctx.lineTo(lastWeekDatapoint.x - 0.05 * width, lastWeekDatapoint.y + height * 0.35);
            // Create left bottom arc
            ctx.arcTo(lastWeekDatapoint.x - 0.05 * width, lastWeekDatapoint.y + height * 0.9, lastWeekDatapoint.x + width * 0.5, lastWeekDatapoint.y + height * 0.9, 80);
            // Continue with horizontal line
            ctx.lineTo(lastWeekDatapoint.x + width * 0.5, lastWeekDatapoint.y + height * 0.9);
            // Create right bottom arc
            ctx.arcTo(lastWeekDatapoint.x + width, lastWeekDatapoint.y + height * 0.9, lastWeekDatapoint.x + width, lastWeekDatapoint.y + height * 0.35, 70);
          }
          // Continue with right vertical line and end path
          ctx.lineTo(lastWeekDatapoint.x + width, thisWeekDatapoint.y);
          ctx.fillStyle = fillColor(lastWeekDatapoint, thisWeekDatapoint) + "40";
          ctx.fill();
          ctx.save();
        },
      }]
```

#### Bar Chart
The bar charts on the three subpages were built upon the BarChart of Chartjs. In order to incorporate this week and last week's data, two x axes were needed, thus requiring xAxisID to be specified. This would allow the chart renderer to know which axis to plot this dataset on, and add customized styling accordingly.

In addition, the daily/weekly/monthly tabs were then implemented with the [`Tabs API`](https://mui.com/components/tabs/#main-content) of the material-ui library.

Here's the sample code in `src/components/subpage/BarChart.tsx`:
```js
    <Tabs value={data}  onChange={handleChange} className={classes.timeTabs} TabIndicatorProps={{style: {display: "none"}}}>
        <Tab className={classes.timeTab} value={dailyData} label="Day" />
        <Tab className={classes.timeTab} value={weeklyData} label="Week" />
        <Tab className={classes.timeTab} value={monthlyData} label="Month" />
    </Tabs>
    <Bar data={data} options={options} plugins={[ChartDataLabels] as any} ref={barChart}/>
```

**Note:** For more troubleshooting on the Chartjs API, please refer to [3.x.x Migration Documentation](https://www.chartjs.org/docs/3.2.1/getting-started/v3-migration.html).

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Dashboard (`src/App.tsx`)
  - [x] Welcome board (`src/components/WelcomePanel.tsx`)
  - [x] Rings (`src/components/DonutPanel.tsx`)
  - [x] Control Center (`src/components/controlCener/*`)
  - [x] Achievement System (`src/components/AchievementPanel.tsx`)
- [x] Subpage (`src/components/subpage`)
  - [x] Utility trend bar chart(daily/weekly/monthly) (`src/components/subpage/BarChart.tsx`)
  - [x] Budget setting panel (`src/components/subpage/BudgetSettingPanel.tsx`)
  - [x] Budget setting popup (`src/components/subpage/BudgetSettingPopup.tsx`)
  - [x] Bottom Navigation (`src/components/subpage/RecommendationPanel.tsx`)
  - [x] Recommendation carousels (`src/components/subpage/RecommendationPanel.tsx`)

See the [open issues](https://github.com/nancywan1004/home-e/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Team HomeE <br />
Developer: Nancy Wan - nancy_wan@thecdm.ca <br />
Project Link: [https://github.com/nancywan1004/home-e](https://github.com/nancywan1004/home-e)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Great acknowledgements to faculty, C16 fellow students and community members of the MDM program at Centre for Digital Media for all the supports and feedback.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
