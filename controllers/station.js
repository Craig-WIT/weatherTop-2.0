"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store");
const uuid = require("uuid");
const stationAnalytics = require("../utils/station-analytics");
const stationConversions = require("../utils/station-conversion");
const axios = require("axios");

const station = {
  index(request, response) {
    const stationId = request.params.id;
    logger.debug("Station id = ", stationId);
    const station = stationStore.getStation(stationId)
    stationAnalytics.updateWeather(station);

    const viewData = {
      title: "WeatherTop 2.0",
      station: stationStore.getStation(stationId),
    };
    response.render("station", viewData);
  },

  stationFail(request, response) {
    const stationId = request.params.id;
    logger.debug("Station id = ", stationId);
    const station = stationStore.getStation(stationId)
    stationAnalytics.updateWeather(station);

    const viewData = {
      title: "WeatherTop 2.0",
      station: stationStore.getStation(stationId),
      message: 'No details can be left blank, please try again!'
    };
    response.render("stationFail", viewData);
  },

  deleteReading(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    const station = stationStore.getStation(stationId);
    logger.debug(`Deleting Reading ${readingId} from Station ${stationId}`);
    stationStore.removeReading(stationId, readingId);
    response.redirect("/station/" + stationId);
  },

  addReading(request, response) {
    const stationId = request.params.id;
    if (request.body.code === "" || request.body.windSpeed === "" || request.body.windDirection === "" || request.body.temperature === "" || request.body.pressure === "") {
      response.redirect('/stationFail/' + stationId);
    }else {
      const stationId = request.params.id;
      const station = stationStore.getStation(stationId);
      const newReading = {
        id: uuid.v1(),
        code: Number(request.body.code),
        date: stationConversions.convertDate(new Date()),
        temperature: Number(request.body.temperature),
        windSpeed: Number(request.body.windSpeed),
        windDirection: Number(request.body.windDirection),
        pressure: Number(request.body.pressure),
      };
      logger.debug("New Reading = ", newReading);
      stationStore.addReading(stationId, newReading);
      stationAnalytics.updateWeather(station);
      response.redirect("/station/" + stationId);
    }
  },

    async addLiveReading(request, response) {
      const stationId = request.params.id;
      const station = stationStore.getStation(stationId);
      logger.info("rendering new report");
      const lat = station.lat;
      const lng = station.lng;
      const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=f2ead5d9e870cf42faa52050137524e1`
      const result = await axios.get(requestUrl);
      if (result.status == 200) {
        const reading = result.data.current;
        const newReading = {
          id: uuid.v1(),
          date: stationConversions.convertDate(new Date()),
          code: stationAnalytics.convertCode(reading.weather[0].icon),
          temperature: reading.temp,
          windSpeed: reading.wind_speed,
          pressure: reading.pressure,
          windDirection: reading.wind_deg,
        };
        logger.debug("New Reading = ", newReading);
        stationStore.addReading(stationId, newReading);
        stationAnalytics.updateWeather(station);
        response.redirect("/station/" + stationId);
      };
      },
};

module.exports = station;