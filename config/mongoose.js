// Import the module
const mongoose = require('mongoose');

// Connect to the MongoDB database using the connection string from MongoDB Atlas
mongoose.connect('mongodb+srv://shaikhasad765:Asad12345@cluster0.jaoadsc.mongodb.net/Auth?retryWrites=true&w=majority');

// Get the default connection object from Mongoose
const db = mongoose.connection;

// Event listener for database connection error
db.on('error', console.error.bind(console, 'Error in Connecting to db'));

// Event listener for successful database connection
db.once('open', function() {
    console.log("Connected to the Database Successfully");
});