//SET UP
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
	//passport - to authenticate with username/password
var passport = require("passport");
var LocalStrategy = require("passport-local");
var Project = require("./models/project");
var Career = require("./models/career");
var Elearning = require("./models/elearning");
var User = require("./models/user");
var methodOverride = require("method-override");
var multer = require("multer");
var path = require("path");
//requiring routes
var indexRoutes = require("./routes/index");
var projectsRoutes = require("./routes/projects");
var careersRoutes = require("./routes/careers");
var elearningsRoutes = require("./routes/elearnings");

//APP CONFIG
mongoose.connect("mongodb://localhost/scicwebapp", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

//PASSPORT CONFIG
app.use(require("express-session")({
	secret:"fpvpavargrrafriraglfvk",
	resave:false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	next();
});

//ROUTES APP CONFIG
app.use("/", indexRoutes);
app.use("/projects", projectsRoutes);
app.use("/careers", careersRoutes);
app.use("/elearnings", elearningsRoutes);

//System Certifications Route
app.get("/systemcertifications", function(req,res){
	res.render("systemcertifications");
});

app.get("*", function(req, res) {
    res.send("You are trying to access a page that does not exist.");
});

//SERVER
app.listen(3000 | process.env.PORT, process.env.IP, function(){
	console.log("SCIC-WEB-APP SERVER STARTED");
});