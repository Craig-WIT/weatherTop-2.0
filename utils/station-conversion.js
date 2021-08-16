"use strict";

const stationStore = require("../models/station-store");

const stationConversion = {

  tempF(tempC){
    return (tempC *1.8) +32;
  },

  beafourt(windspeed) {
  if (windspeed == 0) {
    return 0;
  } else if (windspeed >= 1 && windspeed <= 6) {
    return 1;
  } else if (windspeed >= 7 && windspeed <= 11) {
    return 2;
  } else if (windspeed >= 12 && windspeed <= 19) {
    return 3;
  } else if (windspeed >= 20 && windspeed <= 29) {
    return 4;
  } else if (windspeed >= 30 && windspeed <= 39) {
    return 5;
  } else if (windspeed >= 40 && windspeed <= 50) {
    return 6;
  } else if (windspeed >= 51 && windspeed <= 62) {
    return 7;
  } else if (windspeed >= 63 && windspeed <= 75) {
    return 8;
  } else if (windspeed >= 76 && windspeed <= 87) {
    return 9;
  } else if (windspeed >= 88 && windspeed <= 102) {
    return 10;
  } else if (windspeed >= 103 && windspeed <= 117) {
    return 11;
  } else if (windspeed >= 117) {
    return 12;
  }
  return -1;
},

  degreesToCompass(windDirection) {
  if (windDirection > 11.25 && windDirection <= 33.75) {
    return "North North East";
  } else if (windDirection > 33.75 && windDirection <= 56.25) {
    return "East North East";
  } else if (windDirection > 56.25 && windDirection <= 78.75) {
    return "East";
  } else if (windDirection > 78.75 && windDirection <= 101.25) {
    return "East South East";
  } else if (windDirection > 101.25 && windDirection <= 123.75) {
    return "East South East";
  } else if (windDirection > 123.75 && windDirection <= 146.25) {
    return "South East";
  } else if (windDirection > 146.25 && windDirection <= 168.75) {
    return "South South East";
  } else if (windDirection > 168.75 && windDirection <= 191.25) {
    return "South";
  } else if (windDirection > 191.25 && windDirection <= 213.75) {
    return "South South West";
  } else if (windDirection > 213.75 && windDirection <= 236.25) {
    return "South West";
  } else if (windDirection > 236.25 && windDirection <= 258.75) {
    return "West South West";
  } else if (windDirection > 258.75 && windDirection <= 281.25) {
    return "West";
  } else if (windDirection > 281.25 && windDirection <= 303.75) {
    return "West North West";
  } else if (windDirection > 303.75 && windDirection <= 326.25) {
    return "North West";
  } else if (windDirection > 326.25 && windDirection <= 348.75) {
    return "North North West";
  } else {
    return "North";
  }
},

};

module.exports = stationConversion;