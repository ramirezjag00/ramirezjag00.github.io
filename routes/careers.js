var express = require("express");
var router = express.Router();
var middleware = require("../middleware");
var Career = require("../models/career");

//Careers Route
router.get("/", function(req,res){
	//get all careers from DB
	Career.find({}, function(err, allCareers){
		if(err){
			console.log(err);
		} else {
			res.render("careers/careers", {careers: allCareers});
		}
	});
});

//CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req,res){
	var jobtitle = req.body.jobtitle;
	var department = req.body.department;
	var location = req.body.location;
	var category = req.body.category;
	var qualification = req.body.qualification;
	var jobdescription = req.body.jobdescription;
	var newCareer = {jobtitle: jobtitle, department:department, location: location, category:category, qualification: qualification, jobdescription:jobdescription}
	//create a new career and save to DB
	Career.create(newCareer, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			res.redirect("/careers");
		}
	});
});

// NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req,res){
	res.render("careers/new");
});

//SHOW - RESTFUL ROUTE
router.get("/:id", function(req,res){
	//find the Career with the provided ID
	Career.findById(req.params.id, function(err,foundCareer){
		if(err){
			res.redirect("careers");
		} else {
			//render show template with that career
			res.render("careers/show", {career: foundCareer});
		}
	});
});

//DESTROY ROUTE
router.delete("/:id", middleware.isLoggedIn, function(req,res){
	Career.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("back");
		} else {
			res.redirect("/careers");
		}
	});
});




module.exports = router;