//PROJECT SCHEMA/MODEL
var mongoose = require("mongoose");

var projectSchema = new mongoose.Schema({
	name:String,
	location: String,
	year: Number,
	category: String,
	image:[{
		type:String,
	}],
	description: String
});

module.exports = mongoose.model("Project", projectSchema);