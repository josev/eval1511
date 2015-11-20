var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	nombre: String,
	apellido: String,
	edad: Number,
	email: String,
	sexo: String,
	password: String,
	token: String
});

module.exports = mongoose.model("User", UserSchema);