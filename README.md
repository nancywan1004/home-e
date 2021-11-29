<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]


<div align="center">
  <a href="https://github.com/nancywan1004/home-e">
    <img src="public/images/HomeE_logo.png" alt="Logo" width="120" height="80">
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

```js
<Doughnut data={props.utilityData} width={100} height={100} options={options} plugins={plugins}/>
```

#### Shaded Area
The shaded area under each ring indicating the weekly utility trend was created based on LineChart of Chartjs. One big challenge of using the AreaChart directly was to fill the area while retaining the round corner of the card container. This would then require a workaround using the native Canvas `arcTo()` [method](https://www.w3schools.com/tags/canvas_arcto.asp) for articulated area calculations. The drawing time of this shaded area occurs at the `beforeDraw` stage. 

Here's the sample code:
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
          ctx.moveTo(lastWeekDatapoint.x - 0.05 * width, lastWeekDatapoint.y);           // Create a starting point
          if (lastWeekDatapoint.y <= thisWeekDatapoint.y) {
            ctx.lineTo(lastWeekDatapoint.x - 0.05 * width, lastWeekDatapoint.y + height * 0.35);          // Create a vertical line
            ctx.arcTo(lastWeekDatapoint.x - 0.05 * width, lastWeekDatapoint.y + height, lastWeekDatapoint.x + width * 0.3, lastWeekDatapoint.y + height, 60); // Create an arc
            ctx.lineTo(lastWeekDatapoint.x + width * 0.5, lastWeekDatapoint.y + height);         // Continue with horizontal line
            ctx.arcTo(lastWeekDatapoint.x + width, lastWeekDatapoint.y + height, lastWeekDatapoint.x + width, lastWeekDatapoint.y + height * 0.35, 55);
          } else {
            ctx.lineTo(lastWeekDatapoint.x - 0.05 * width, lastWeekDatapoint.y + height * 0.35);          // Create a vertical line
            ctx.arcTo(lastWeekDatapoint.x - 0.05 * width, lastWeekDatapoint.y + height * 0.9, lastWeekDatapoint.x + width * 0.5, lastWeekDatapoint.y + height * 0.9, 80); // Create an arc
            ctx.lineTo(lastWeekDatapoint.x + width * 0.5, lastWeekDatapoint.y + height * 0.9);         // Continue with horizontal line
            ctx.arcTo(lastWeekDatapoint.x + width, lastWeekDatapoint.y + height * 0.9, lastWeekDatapoint.x + width, lastWeekDatapoint.y + height * 0.35, 70);
          }
          ctx.lineTo(lastWeekDatapoint.x + width, thisWeekDatapoint.y);
          ctx.fillStyle = fillColor(lastWeekDatapoint, thisWeekDatapoint) + "40";
          ctx.fill();
          ctx.save();
        },
      }]
```

For more information on the rendering pipeline of the plugins, please refer to [Rendering Documentations](https://www.chartjs.org/docs/latest/developers/plugins.html#rendering).

#### Bar Chart


**Note:** For more troubleshooting on the Chartjs API, please refer to [3.x.x Migration Documentation](https://www.chartjs.org/docs/3.2.1/getting-started/v3-migration.html).

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Dashboard
  - [x] Welcome board
  - [x] Rings
  - [x] Control Center
  - [ ] Achievement System(TODO) 
- [ ] Subpage
  - [x] Utility trend bar chart(daily/weekly/monthly)
  - [x] Budget setting panel
  - [x] Budget setting popup
  - [x] Bottom Navigation
  - [ ] Recommendation carousels(TODO) 

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

Nancy Wan - nancy_wan@thecdm.ca

Project Link: [https://github.com/nancywan1004/home-e](https://github.com/nancywan1004/home-e)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* []()
* []()
* []()

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
