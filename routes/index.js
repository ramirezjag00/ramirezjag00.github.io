var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//Root Route
router.get("/", function(req, res) {
	res.render("index");
});

//register form route
router.get("/register", function(req, res) {
	res.render("register");
});

//handle sign up logic
router.post("/register", function(req, res) {
	var newUser = new User({ name: req.body.name, username: req.body.username, isAuthAccount:req.body.adminCode });
	if(req.body.adminCode === "!L0v35C1c"){
        newUser.isAuthAccount = true;
	User.register(newUser, req.body.password, function(err, user) {
		if (err) {
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function() {
			res.redirect("/");
		});
	});
} else {
	res.render("register");
}
});

//log in route
router.get("/login", function(req, res) {
	res.render("login");
});

//handling log in logic
router.post("/login", passport.authenticate("local", {
	successRedirect: "/",
	failureRedirect: "/login",
}), function(req, res) {});

//log out route
router.get("/logout", function(req, res) {
	req.logout();
	res.redirect("/login");
});

module.exports = router;