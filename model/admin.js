var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var admins = Schema({
	username : String,
	pwd : String,
	create_Date : {type:Date,default:Date.now}
});
var adminModel = mongoose.model("adminer",admins);
module.exports = adminModel;