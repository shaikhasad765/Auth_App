// Importing required modules and dependencies
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');
const passport = require('passport');

// Setting up routes

// Route for the sign-up page
router.get('/sign-up',usersController.signup);

// Route for the sign-in page
router.get('/sign-in',usersController.signin);

// Route for the profile page, with authentication check
router.get('/profile',passport.checkAuthentication,usersController.profile);

// Route for creating a user account
router.post('/create',usersController.create);

// Route for creating a session upon user authentication
router.post('/create-session', passport.authenticate(
    'local', { failureRedirect: '/users/sign-in', failureFlash: true }
), usersController.createSession);

// Route for signing out the user
router.get('/sign-out',usersController.destroySession);

// Route for Google OAuth authentication
router.get('/auth/google', passport.authenticate('google', {scope: ['profile','email']}));

// Callback route after successful Google authentication
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: 'users/sign-in'}), usersController.createSession);

// Route for the change password page
router.get('/changepass',passport.checkAuthentication,usersController.changePassword);
// Route for updating the password
router.post('/update/:id',passport.checkAuthentication,usersController.updatePassword);
// Route for the forget password page
router.get('/forget-password',usersController.forgetPassword);
// Route for generating a random number
router.get('/randomNumber/:id',usersController.randomNum)
// Route for confirming the password
router.get('/confirmpassword',usersController.confirmPassword)

module.exports = router;