// Importing modules and dependencies
const User = require("../models/user")
const alertMailer = require('../mailer/testmailer');
const resetMailer = require('../mailer/resetpasswordmailer');
const bcrypt = require('bcrypt'); 
const sendOtop=require('../mailer/resetpasswordmailer')

// Render profile page
module.exports.profile = function(req, res) {
    return res.render('profile', {
        title: "Profile"
    })
}

// Render sign-up page
module.exports.signup = function(req,res){

    if(req.isAuthenticated()){
        return res.render('profile',{
            title: 'profile'
        })

    }
    return res.render('user_sign_up',{
        title: "Signup"
    })
}

// Render sign-in page
module.exports.signin = function(req,res){

    if(req.isAuthenticated()){
        return res.render('profile',{
            title: 'profile'
        })

    }
    return res.render('user_sign_in',{
        title: "Signin"
    })
}

// Get signup data and Create a new user
module.exports.create = async function (req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    try {
        const user = await User.findOne({ email });
    
        if (!user) {
            if (password != confirmPassword) {
                req.flash('error', 'Passwords do not match');
                return res.redirect('/users/sign-up');
            }
    
            const newUser = new User({
                name,
                email,
                password
            });
    
        newUser.save();
        req.flash('success', 'You have signed up successfully. Please log in to continue.');
        return res.redirect('/users/sign-in');

        } else {
            req.flash('error', 'User with the provided email already exists');
            return res.redirect('back');
        }
    } catch (err) {
        console.log(err);
    }
};

// Create a session for the user upon sign-in
module.exports.createSession = function(req,res){
    req.flash('success','Logged-in Successfully');
    return res.redirect('/');
}

// Destroy the session and log the user out
module.exports.destroySession = function (req, res) {
    req.logout(function (err) {
        if (err) {
            console.log('err');
        }
});
    console.log("logged out");
    req.flash('success','Logged-out Successfully');
    res.redirect('/')

}

// Render the change password page
module.exports.changePassword = function(req,res){
    return res.render('changepass',{
        title: 'Change Password'
    })
}

// Update the password for the user
module.exports.updatePassword = async function(req,res){

    try{

    const user = await User.findById(req.params.id);
        if(!user){
            console.log(err);
        }
        else{
            if(req.user.email == req.body.email && req.body.opass){
                let isMatched= await bcrypt.compare(req.body.opass,user.password);
                console.log(isMatched);
                console.log(req.body.opass);
                console.log(user.password);

                if(!isMatched){
                    req.flash('error', 'Invalid Password');
                    console.log("Invalid Old Password ");
                    return res.redirect('back')

                }else{

                    let newpass= await bcrypt.hash(req.body.npass,10);
                    console.log(newpass);
                    console.log("pppp");
                    User.findByIdAndUpdate(req.params.id,{password: newpass },function(err,user){
                        req.flash('success', 'Password Has Been Changed Successfully');
                        return res.redirect('back')
                    })
                }
            }
        }
}
catch(err){
    console.log("errrr");
}
}

// Render the forget password page
module.exports.forgetPassword = function(req,res){
    return res.render('forgetpassword',{
        title: "ForgetPassword"
    });
}

// Generate a random number for password reset and send an email
module.exports.randomNum = async function(req,res){

    const email = await req.body.email;

    try{

        const user = await User.findById(req.params.id);
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            var string_length = 8;
            var randomstring = '';
            for (var i=0; i<string_length; i++) {
                var rnum = Math.floor(Math.random() * chars.length);
                randomstring += chars.substring(rnum,rnum+1);
            }
            var k = randomstring
            console.log(k,"heeeheheheheheh");

        var mail = req.user.email
        var name = req.user.name
        console.log(req.user.name);

            resetMailer.resetMail(k,mail,name)
            console.log(req.params.id,"save");
            var otp;

        let newpassword= await bcrypt.hash(k,10);
        console.log("new pass",newpassword);
        User.findByIdAndUpdate(req.params.id,{password: newpassword}, function(err,user){
            req.flash('success','Password Reset and Temperorary Password is Send To Your Email');
            return res.redirect('back')

    })
    }
    catch(err){
        console.log("error",err);
    }
}

// Render Confirm Password Page
module.exports.confirmPassword = function(req,res){
    console.log("ooo");
    console.log(req.session.value);
}