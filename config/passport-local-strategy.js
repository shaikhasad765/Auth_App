// Importing modules
const passport = require('passport');
const bcrypt = require('bcrypt'); 
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const alertMailer = require('../mailer/testmailer');
const UserController = require("../controllers/users_controller")

//Authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    },
    function(req, email, password, done) {

        // Find user and estabilish identity
        User.findOne({ email: email }, function(err, user) {
            if (err) {
                console.log("Error in finding user --> password");
                return done(err);
            }
            if (!user) { 
                // Check if user is null or undefined
                req.flash('error', 'Invalid Username/Password');
                console.log("Invalid username password");
                return done(null, false);
            }

            bcrypt.compare(password, user.password, (err, res) => {
                if (!res) {
                    // If password is incorrect, return error
                    req.flash('error', 'Invalid Username/Password');
                    console.log("Invalid username password");
                    return done(null, false);
                }

                if (err) {
                    // If an error occurs during bcrypt comparison, return error
                    console.log(err, "Error in bcrypt");
                    return done(null, false);
                }

                // Send login alert email (Note alert email will only be send on actual registered enail id's which actually exist)
                alertMailer.loginAlert(user);
                return done(null, user);
            });
        });
    }
));

// Serialise the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// Deserialise the user from the key in the cookies
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        if (err) {
            console.log("Error in finding user --> passport");
            return done(err);
        }
        return done(null, user);
    });
});

// Check if the user is authenticated
passport.checkAuthentication = function(req, res, next) {
    if (req.isAuthenticated()) {

        console.log("Authenticated...");
        return next();
    }

    // If the user is not signed in, redirect to the sign-in page
    console.log("User not Authenticated");
    return res.render('user_sign_in')
}

// Set the authenticated user in the response locals
passport.setAuthenticatedUser = function(req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }

    next();
}

// Set the authenticated user in the response locals
module.exports = passport;