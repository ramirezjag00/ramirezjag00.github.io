//ELEARNING SCHEMA/MODEL
var mongoose = require("mongoose");

var elearningSchema = new mongoose.Schema({
	title: String,
	date: {type:Date, default: new Date()},
	description: String,
	file: [{
		type:String,
	}]
});

module.exports = mongoose.model("Elearning", elearningSchema);