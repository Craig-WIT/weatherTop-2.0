'use strict';

const _ = require("lodash");
const JsonStore = require("./json-store");
const stationAnalytics = require("../utils/station-analytics");
const stationStore = {

  store: new JsonStore("./models/station-store.json", {
    stationCollection: []
  }),
  collection: "stationCollection",

  getAllStations() {
    return this.store.findAll(this.collection);
  },

  getStation(id){
    return this.store.findOneBy(this.collection, { id: id });
  },

  addStation(station) {
    this.store.add(this.collection, station);
    this.store.save();
  },

  removeStation(id) {
    const station = this.getStation(id);
    this.store.remove(this.collection, station);
    this.store.save();
  },

  addReading(id, reading) {
    const station = this.getStation(id);
    station.readings.push(reading);
    this.store.save();
    stationAnalytics.updateWeather(station);
  },

  getUserStations(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },

};

module.exports = stationStore;