var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserLoginSchema = new Schema({
	email: String,
	password: String
});

module.exports = mongoose.model("UserLogin", UserLoginSchema);