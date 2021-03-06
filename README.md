# CityAQ
[![Build Status](https://travis-ci.org/jackkoppa/cityaq.svg?branch=master)](https://travis-ci.org/jackkoppa/cityaq)
[![Coverage Status](https://coveralls.io/repos/github/jackkoppa/cityaq/badge.svg?branch=master)](https://coveralls.io/github/jackkoppa/cityaq?branch=master)
## Background
Single page Angular app to compare simple air quality data for different cities, using data from the [OpenAQ](https://openaq.org/) API. Intended to be a quick, mobile-first reference for current air quality information around the world. 
* Strongly typed OpenAQ API implementation using TypeScript
* Angular Material for UI components
* Google Static Maps API for location images
* Modularized Sass for styling

## Running Locally
### Install
* Node.js & npm ([link](https://nodejs.org/en/download/))

### Run
```shell
npm install -g @angular/cli
git clone https://github.com/jackkoppa/cityaq.git
cd cityaq
npm install
ng serve
```

Livereloading dev server now available at `http://localhost:4200/`

### Additional Angular CLI commands

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Contributors
Big thanks to [RobertImbrie](https://github.com/RobertImbrie) & [hegotgame](https://github.com/hegotgame) for their help in creating the project @ Rokkincat's Hack & Tell on Oct. 21, 2017.
