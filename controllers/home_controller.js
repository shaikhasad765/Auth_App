// Controller for handling the home route
// Exporting the home function to handle the home route
module.exports.home=function(req,res){

    // Log the cookies received in the request
    console.log(req.cookies);

    // Log a string "BOATAUTH_Controller"
    console.log("BOATAUTH_Controller");

    // Log the body of the request
    console.log(req.body);

    // Render the 'home' template and send it as the response
    return res.render('home')
}