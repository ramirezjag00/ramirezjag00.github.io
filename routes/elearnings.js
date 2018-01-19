var express = require("express");
var router = express.Router();
var middleware = require("../middleware");
var Elearning = require("../models/elearning");
var multer = require("multer");
var path = require("path");

//Set Storage Engine
var storage = multer.diskStorage({
	destination: './public/uploads/',
	filename: function(req, file, callback) {
		callback(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});

//Init Upload
var upload = multer({
	storage: storage,
	limits:{fileSize: 5000000},
	fileFilter: function(req,file,callback){
		checkFileType(file, callback);
	}
});

// Check File Type
function checkFileType(file, callback){
  // Allowed ext
  var filetypes = /pdf|jpg|jpeg|png/;
  // Check ext
  var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  var mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
  	return callback(null,true);
  } else {
  	callback('Error: PDF Files Only!');
  }
};

//Elearning Route
router.get("/", function(req,res){
	//get all elearnings from DB
	Elearning.find({}, function(err, allElearnings){
		if(err){
			console.log(err);
		} else {
			res.render("elearnings/elearnings", {elearnings: allElearnings});
		}
	});
});

//CREATE ROUTE
router.post("/", middleware.isLoggedIn, upload.array("file", 2), function(req,res){
	var title = req.body.title;
	var description = req.body.description;
	var file = [];
	for(var i = 0; i < req.files.length; i++){
		file.push(req.files[i].filename);
	};
	var newElearning = {title: title, description: description, file: file}
	//create a new elearning and save to DB
	Elearning.create(newElearning, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			res.redirect("/elearnings");
		}
	});
});

// NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req,res){
	res.render("elearnings/new");
});

//DESTROY ROUTE
router.delete("/:id", middleware.isLoggedIn, function(req,res){
	Elearning.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("back");
		} else {
			res.redirect("/elearnings");
		}
	});
});




module.exports = router;