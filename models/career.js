//CAREER SCHEMA/MODEL
var mongoose = require("mongoose");

var careerSchema = new mongoose.Schema({
	jobtitle:String,
	department: String,
	location: String,
	listCategory:{type:String, default: "allJobs"},
	category: String,
	qualification: String,
	jobdescription: String
});

module.exports = mongoose.model("Career", careerSchema);