var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var LocationSchema = new Schema({
	nombre: String,
	descripcion: String,
	ubicacion: {
		latitude:Number,
		longitude:Number
	}
});

module.exports = mongoose.model("Location", LocationSchema);