var express = require("express");
var router = express.Router();
var middleware = require("../middleware");
var Project = require("../models/project");
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
	limits:{fileSize: 1000000},
	fileFilter: function(req,file,callback){
		checkFileType(file, callback);
	}
});

// Check File Type
function checkFileType(file, callback){
  // Allowed ext
  var filetypes = /jpeg|jpg|png/;
  // Check ext
  var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  var mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
  	return callback(null,true);
  } else {
  	callback('Error: Images Only!');
  }
};



//Projects Route

router.get("/", function(req,res){
	//get all projects from DB
	Project.find({}, function(err, allProjects){
		if(err){
			console.log(err);
		} else {
			res.render("projects/projects", {projects: allProjects});
		}
	});
});


//CREATE ROUTE
router.post("/", middleware.isLoggedIn, upload.array("image", 2), function(req,res){
	var name = req.body.name;
	var location = req.body.location;
	var year = req.body.year;
	var category = req.body.category;
	var image = [];
	for(var i = 0; i < req.files.length; i++){
		image.push(req.files[i].filename);
	};
	var desc = req.body.description;
	var newProject = {name: name, location:location, year: year, category: category, image: image, description:desc}
	//create a new project and save to DB
	Project.create(newProject, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			res.redirect("/projects");
		}
	});
});

// NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req,res){
	res.render("projects/new");
});

//DESTROY ROUTE
router.delete("/:project_id", middleware.isLoggedIn, function(req,res){
	Project.findByIdAndRemove(req.params.project_id, function(err){
		if(err){
			res.redirect("back");
		} else {
			res.redirect("/projects");
		}
	});
});


module.exports = router;