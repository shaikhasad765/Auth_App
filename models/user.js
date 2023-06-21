// Importing modules and dependencies
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcrypt'); 

// Defining the user schema using Mongoose
const userSchema = new mongoose.Schema({
    
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },

    name:{
        type: String,
        required: true
    
    }

},{
    timestamps: true
});

// Pre-save hook to hash the password before saving the user object
userSchema.pre('save',async function(next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10);
        next();
    }
})

// Creating the User model using the defined schema
const User = mongoose.model('User',userSchema);

module.exports = User;