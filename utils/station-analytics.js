"use strict";

const stationConversion = require("../utils/station-conversion");

const stationAnalytics = {

  getLatestReading(station) {
    let latestReading = null;
    if (station.readings.length > 0) {
      latestReading = station.readings[station.readings.length - 1];
      }
    return latestReading;
  },

  updateWeather(station) {
    let latestReading = null;
    if (station.readings.length > 0) {
      latestReading = this.getLatestReading(station);
      station.tempC = latestReading.temperature;
      station.pressure = latestReading.pressure;
      station.tempF = stationConversion.tempF(latestReading.temperature);
      station.windBft = stationConversion.beafourt(latestReading.windSpeed);
      station.windCompass = stationConversion.degreesToCompass(latestReading.windDirection);
      station.windChill = this.windChill(latestReading.temperature,latestReading.windSpeed);
      station.weatherCode = this.stationWeather(latestReading.code);
      station.weatherIcon = this.weatherIcon(latestReading.code);
      station.maxTemp = this.getMaxTemp(station.readings);
      station.minTemp = this.getMinTemp(station.readings);
      station.maxWind = this.getMaxWind(station.readings);
      station.minWind = this.getMinWind(station.readings);
      station.maxPressure = this.getMaxPressure(station.readings);
      station.minPressure = this.getMinPressure(station.readings);
      station.tempTrend = this.tempTrend(station.readings);
      station.windTrend = this.windTrend(station.readings);
      station.pressureTrend = this.pressureTrend(station.readings);
    }
  },

  windChill(temp, windspeed) {
    let windChill = 13.12 + 0.6215 * temp - 11.37 * (Math.pow(windspeed, 0.16)) + 0.3965 * temp * (Math.pow(windspeed, 0.16));
    return Math.round(windChill * 100 + Number.EPSILON) / 100;
  },

  stationWeather(code){
    let weatherCode = "Not valid WeatherCode";
      if(code == 100) {
        weatherCode = "Clear";
        return weatherCode;
      }else if(code == 200){
        weatherCode = "Partial clouds";
        return weatherCode;
      }else if(code == 300) {
        weatherCode = "Cloudy";
        return weatherCode;
      }else if(code == 400) {
        weatherCode = "Light Showers";
        return weatherCode;
      }else if(code == 500) {
        weatherCode = "Heavy Showers";
        return weatherCode;
      }else if(code == 600) {
        weatherCode = "Rain";
        return weatherCode;
      }else if(code == 700) {
        weatherCode = "Snow";
        return weatherCode;
      } else if(code == 800) {
        weatherCode = "Thunder";
        return weatherCode;
      } else {
        return weatherCode;
      }
  },

  weatherIcon(code){
    let icon = "../images/na.png";
    if(code == 100) {
      icon = "../images/clear.png";;
      return icon;
    }else if(code == 200){
      icon = "../images/partialcloud.png";
      return icon;
    }else if(code == 300) {
      icon = "../images/heavycloud.png";
      return icon;
    }else if(code == 400) {
      icon = "../images/lightrain.png";
      return icon;
    }else if(code == 500) {
      icon = "../images/rain.png";
      return icon;
    }else if(code == 600) {
      icon = "../images/heavyrain.png";
      return icon;
    }else if(code == 700) {
      icon = "../images/snow.png";
      return icon;
    } else if(code == 800) {
      icon = "../images/thunder.png";
      return icon;
    } else {
      return icon;
    }
  },

  getMaxTemp(readings) {
    if (readings.length > 0) {
      let maxTemp = readings[0].temperature;
      for (let i = 0; i < readings.length; i++) {
        if (readings[i].temperature > maxTemp)
          maxTemp = readings[i].temperature;
      }
      return maxTemp;
    } else
      return 0.0;
  },

  getMinTemp(readings) {
    if (readings.length > 0){
      let minTemp = readings[0].temperature;
      for (let i = 0; i < readings.length; i++) {
        if (readings[i].temperature < minTemp)
          minTemp = readings[i].temperature;
      }
      return minTemp;
    } else
      return 0.0;
  },

  getMaxWind(readings) {
    if (readings.length > 0) {
      let maxWind = readings[0].windSpeed;
      for (let i = 0; i < readings.length; i++) {
        if (readings[i].windSpeed > maxWind)
          maxWind = readings[i].windSpeed;
      }
      return maxWind;
    } else
      return 0.0;
  },

  getMinWind(readings) {
    if (readings.length > 0) {
      let minWind = readings[0].windSpeed;
      for (let i = 0; i < readings.length; i++) {
        if (readings[i].windSpeed < minWind)
          minWind = readings[i].windSpeed;
      }
      return minWind;
    } else
      return 0.0;
  },

  getMaxPressure(readings) {
    if (readings.length > 0) {
      let maxPressure = readings[0].pressure;
      for (let i = 0; i < readings.length; i++) {
        if (readings[i].pressure > maxPressure)
          maxPressure = readings[i].pressure;
      }
      return maxPressure;
    } else
      return 0.0;
  },

  getMinPressure(readings) {
    if (readings.length > 0) {
      let minPressure = readings[0].pressure;
      for (let i = 0; i < readings.length; i++) {
        if (readings[i].pressure < minPressure)
          minPressure = readings[i].pressure;
      }
      return minPressure;
    } else
      return 0.0;
  },

  tempTrend(readings) {
  let tempTrend = "../images/noTrend.png";
  if (readings.length > 2) {
    let tempValues = [];
    tempValues= [readings[readings.length -3].temperature, readings[readings.length -2].temperature, readings[readings.length -1].temperature];
    tempTrend = this.calcTrend(tempValues);
  }
  return tempTrend;
},

  windTrend(readings) {
    let windTrend = "../images/noTrend.png";
    if (readings.length > 2) {
      let windValues = [];
      windValues= [readings[readings.length -3].windSpeed, readings[readings.length -2].windSpeed, readings[readings.length -1].windSpeed];
      windTrend = this.calcTrend(windValues);
    }
    return windTrend;
  },

  pressureTrend(readings) {
    let pressureTrend = "../images/noTrend.png";
    if (readings.length > 2) {
      let pressureValues = [];
      pressureValues= [readings[readings.length -3].pressure, readings[readings.length -2].pressure, readings[readings.length -1].pressure];
      pressureTrend = this.calcTrend(pressureValues);
    }
    return pressureTrend;
  },

  calcTrend(values) {
  let trend = "../images/noTrend.png";
  if (values.length > 2) {
    if (( values[2] > values[1] ) && (values[1] > values[0])) {
      trend = "../images/trendUp.png";
    } else if (( values[2] < values[1] ) && (values[1] < values[0])) {
      trend = "../images/trendDown.png";
    }
  }
  return trend;
},

};

module.exports = stationAnalytics;