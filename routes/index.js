// Importing modules and dependencies
const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const passport = require('passport');

// Setting up routes

// Route for the home page, with authentication check
router.get('/',passport.checkAuthentication,homeController.home);

// Route for handling user-related routes, using the users.js file as the route handler
router.use('/users', require('./users'));

module.exports = router; 