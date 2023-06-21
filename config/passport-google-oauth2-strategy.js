// Importing modules

const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User=require('../models/user');
const env = require('./enviroment')

// Configuring the Google OAuth2 strategy for passport
passport.use(new googleStrategy({
    clientID: env.google_client_id,
    clientSecret: env.google_client_secret,
    callbackURL: env.google_call_back_url
    },
    
    function(accessToken,refreshToken,profile,done){

        // Find a user with the same email in the database
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){

            if(err){
                // Log an error message if an error occurs
                console.log("error in google strategy passport",err);
                return;
            }
            console.log(profile);

            if(user){
                 // If user exists
                return done(null, user);
            }

            else{
                // If user does not exist, create a new user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                },function(err,user){

                    if(err){
                        // Log an error message if an error occurs during user creation
                        console.log("error in creating user google strategy passport",err);
                        return;
                    }
                    return done(null, user);
                })
            }
        })
    }
))

// Export the configured passport object
module.exports = passport;