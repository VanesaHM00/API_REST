const mongoose = require("mongoose");
const tipoSchema = mongoose.Schema({
	nombre: {
		type: String,
		index: true,
		required: true
	},
	descripcion: {
		type: String
	}
}, { timestamps: true });
module.exports = mongoose.model("Tipo", tipoSchema);