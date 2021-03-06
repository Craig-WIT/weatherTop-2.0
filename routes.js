"use strict";

const express = require("express");
const router = express.Router();

const dashboard = require("./controllers/dashboard.js");
const about = require("./controllers/about.js");
const station = require('./controllers/station.js');
const accounts = require('./controllers/accounts.js');

router.get("/dashboard", dashboard.index);
router.get('/dashboard/deletestation/:id', dashboard.deleteStation);
router.post("/dashboard/addStation", dashboard.addStation);

router.get("/about", about.index);

router.get('/station/:id', station.index);
router.get('/stationFail/:id', station.stationFail);
router.get('/station/:id/deleteReading/:readingid', station.deleteReading);
router.post('/station/:id/addReading', station.addReading);
router.post('/station/:id/addLiveReading', station.addLiveReading);

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.get('/userDetails', accounts.userDetails);
router.get('/userDetailsFail', accounts.userDetailsFail);
router.post('/userDetails/:id/updateUserDetails', accounts.updateUserDetails);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

module.exports = router;
