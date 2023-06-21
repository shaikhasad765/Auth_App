// Importing modules and dependencies
const nodeMailer = require("../config/nodemailer");
const User = require("../models/user");
const session = require('express-session');

// Function to send password reset email
exports.resetMail = (k,user,name) => {
    console.log('Inside Reset Mailer');
    console.log(user);
    var otp;

    // Render the HTML template for the email using the provided data
    let htmlString = nodeMailer.renderTemplate({k:k, user:user, name:name}, '/Password_Mail/TempPass.ejs');

    // Send the password reset email
    nodeMailer.transporter.sendMail({
        from: 'shaikhasad765@gmail.com', // Sender email address
        to: user, // Recipient email address
        subject: "Password Has Been Reset Successfully", // Email subject

        // HTML content of the email
        html: htmlString
    },
    (err,info)=>{
        if(err){
            console.log('Error in Sending Mail',err);
        }
        console.log("Mail Sent",info);
        return;
    }
    );
} 

