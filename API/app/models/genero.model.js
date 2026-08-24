const mongoose = require("mongoose");
const generoSchema = mongoose.Schema({
	nombre: {
		type: String,
		index: true,
		required: true
	},
	estado: {
		type: String,
		enum: ["Activo", "Inactivo"],
		default: "Activo"
	},
	descripcion: String
}, { timestamps: true });
module.exports = mongoose.model("Genero", generoSchema);