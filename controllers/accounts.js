'use strict';

const userstore = require('../models/user-store');
const logger = require('../utils/logger');
const uuid = require('uuid');

const accounts = {

  index(request, response) {
    const viewData = {
      title: 'Login or Signup',
    };
    response.render('index', viewData);
  },

  login(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('login', viewData);
  },

  userDetails(request, response) {
    const viewData = {
      title: 'User Details',
      user: accounts.getCurrentUser(request),
    };
    response.render('userDetails', viewData);
  },

  updateUserDetails(request, response) {
    let user = accounts.getCurrentUser(request),
    updatedUser = {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      password: request.body.password
    };
    userstore.updateUser(user,updatedUser);
    response.redirect('/userDetails');
  },

  logout(request, response) {
    response.cookie('station', '');
    response.redirect('/');
  },

  signup(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('signup', viewData);
  },

  register(request, response) {
    const user = request.body;
    user.id = uuid.v1();
    userstore.addUser(user);
    logger.info(`registering ${user.email}`);
    response.redirect('/');
  },

  authenticate(request, response) {
    const user = userstore.getUserByEmail(request.body.email);
    if ((user)&&(request.body.password === user.password)) {
      response.cookie('station', user.email);
      logger.info(`logging in ${user.email}`);
      response.redirect('/dashboard');
    } else {
      response.redirect('/login');
    }
  },

  getCurrentUser(request) {
    const userEmail = request.cookies.station;
    return userstore.getUserByEmail(userEmail);
  },
};

module.exports = accounts;