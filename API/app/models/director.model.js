const mongoose = require("mongoose");
const directorSchema = mongoose.Schema({
	nombres: {
		type: String,
		index: true,
		required: true
	},
	estado: {
		type: String,
		enum: ["Activo", "Inactivo"],
		default: "Activo"
	}
}, { timestamps: true });
module.exports = mongoose.model("Director", directorSchema);