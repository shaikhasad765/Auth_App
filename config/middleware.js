// Export the `setFlash` middleware function

module.exports.setFlash=function(req,res,next){

    // Create a `flash` object in `res.locals` to store flash messages
    res.locals.flash={
        'success': req.flash('success'),
        'error': req.flash('error')
    }

    // Call `next` to pass control to the next middleware in the chain
    next();

}