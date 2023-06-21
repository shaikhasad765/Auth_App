// Importing modules and dependencies
const nodeMailer = require("../config/nodemailer");
const User = require("../models/user");
const session = require('express-session');

// Function to send login alert email
exports.loginAlert = (user, name) => {
    console.log('Inside Alert Mailer');

    // Render the HTML template for the email using the provided data
    let htmlString = nodeMailer.renderTemplate({user:user, name:name}, '/Alert_Mail/Alert.ejs');

    // Send the login alert email
    nodeMailer.transporter.sendMail({
        from: 'shaikhasad765@gmail.com', // Sender email address
        to: user.email, // Recipient email address (using the user's email)
        subject: "New login alert",  // Email subject
        html: htmlString // HTML content of the email
    },
    (err,info)=>{
        if(err){
            console.log('error in sending mail',err);
        }
        console.log("mail sent",info);
        return;
    }
    );
} 