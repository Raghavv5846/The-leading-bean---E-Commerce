module.exports.setFlash = function(req, res, next){
    res.locals.toasts = req.toastr.render()
    next()
}
module.exports.checkUrl=function(req,res,next){
    const allowedUrls = ['/', '/menu', '/menu/cartPage','/menu/cartItems','/menu/cartPage/','/menu/cartPage/remove','/reservationData','/about']; // set up the allowed routes
  const requestedUrl = req.originalUrl; // get the requested URL

  if (!allowedUrls.includes(requestedUrl)) { // check if the requested URL is allowed
    res.status(404).render('page404'); // send a 404 error response
  } else {
    next(); // move on to the next middleware or route handler
  }
}