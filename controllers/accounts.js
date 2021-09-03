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

  userDetailsFail(request, response) {
    const viewData = {
      title: 'User Details',
      user: accounts.getCurrentUser(request),
      message: 'No details can be left blank, please try again!'
    };
    response.render('userDetailsFail', viewData);
  },

  updateUserDetails(request, response) {
    let user = accounts.getCurrentUser(request);
    let updatedUser = {};
    if (request.body.firstName === "" || request.body.lastName === "" || request.body.password === "") {
      response.redirect('/userDetailsFail');
    }else {
      updatedUser = {
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        password: request.body.password
      };
      userstore.updateUser(user, updatedUser);
      response.redirect('/userDetails');
    }
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
    if(request.body.email === "" || request.body.password === "" || request.body.firstName === "" || request.body.lastName === ""){
      const viewData = {
        title: 'Login to the Service',
        message: 'No details can be left blank, please try again!',
      };
      response.render('signupfail', viewData);
    } else if(userstore.getUserByEmail(request.body.email)){
      const viewData = {
        title: 'Login to the Service',
        message: 'It looks like this email address is already registered!',
      };
      response.render('signupfail', viewData);
    } else{
      const user = request.body;
      user.id = uuid.v1();
      userstore.addUser(user);
      logger.info(`registering ${user.email}`);
      response.redirect('/');
    }
  },

  authenticate(request, response) {
    const user = userstore.getUserByEmail(request.body.email);
    if ((user)&&(request.body.password === user.password)) {
      response.cookie('station', user.email);
      logger.info(`logging in ${user.email}`);
      response.redirect('/dashboard');
    } else if(!user){
      const viewData = {
        message: 'It looks like this email address is not registered yet!',
      };
      response.render('loginfail',viewData);
    } else if(request.body.password != user.password) {
      const viewData = {
        message: 'Incorrect password entered, please try again!',
      };
      response.render('loginfail', viewData);
    }
  },

  getCurrentUser(request) {
    const userEmail = request.cookies.station;
    return userstore.getUserByEmail(userEmail);
  },
};

module.exports = accounts;