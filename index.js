// Importing required modules and dependencies

const express=require('express');       
const env = require('./config/enviroment'); // Import environment configuration
const cookieParser = require('cookie-parser');
var expressLayouts = require('express-ejs-layouts');   
const port = 8000;

const db=require('./config/mongoose'); // Import Mongoose configuration
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy'); // Import Passport local strategy
const MongoStore = require('connect-mongo');
const passportGoogle=require('./config/passport-google-oauth2-strategy') // Import Passport Google OAuth2 strateg

const flash = require('connect-flash');
const customMware = require('./config/middleware'); // Import custom middleware
const bodyParser = require('body-parser');
const app= express();
app.use(express.static('assets'));

// Configure body-parser to parse JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// Enable URL-encoded data parsing with extended options
app.use(express.urlencoded({ extended: true }));

// Parse cookies using cookie-parser middleware
app.use(cookieParser());

// Use express-ejs-layouts for layout support
app.use(expressLayouts);

// Setup view engine as EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Configure session middleware
app.use(session({
    name: 'issueTracker',
    secret:'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({

        mongoUrl: 'mongodb+srv://shaikhasad765:Asad12345@cluster0.jaoadsc.mongodb.net/Auth?retryWrites=true&w=majority',
        autoRemove: 'disabled'

    },
    function(err){
        console.log(err || 'Error in Connect - mongodb setup ok');
    }
    )
}));

// Initialize passport and session middleware
app.use(passport.initialize());
app.use(passport.session());

// Middleware to set the authenticated user in the request
app.use(passport.setAuthenticatedUser)

// Use connect-flash for flash messages
app.use(flash());

// Middleware to set flash messages
app.use(customMware.setFlash)

// Extract style and script from subpages to layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Include routes
app.use('/', require('./routes'));

// Start the server
app.listen(port, function(err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port} `);
})