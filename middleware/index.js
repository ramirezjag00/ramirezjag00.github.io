//all the middleware goes here
var Project = require("../models/project");
var User = require("../models/user");
var middlewareObj = {};

middlewareObj.isLoggedIn = function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = middlewareObj;
