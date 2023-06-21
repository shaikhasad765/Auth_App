// Importing the modules
const nodemailer = require('nodemailer');
const ejs=require('ejs');
const path = require('path');
const env = require("./enviroment");

// Nodemailer transporter object using SMTP configuration from 'env.smtp'
let transporter = nodemailer.createTransport(env.smtp)

// Function to render an email template using EJS
let renderTemplate = (data, relativePath)=>{
    let mailHTML;

     // Render the template file
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err,template){
            if(err){
                // Log an error message if rendering fails
                console.log("Error in rendering template", err);
                return;
            }
            // Store the rendered HTML content of the template
            mailHTML= template;
        }
    )
     // Return the rendered HTML content of the template
    return mailHTML;
}

// Export the transporter and renderTemplate functions for use in other modules
module.exports={
    transporter: transporter,
    renderTemplate: renderTemplate
}