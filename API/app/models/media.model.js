const mongoose = require("mongoose");
const mediaSchema = new mongoose.Schema({
  serial: { type: String, required: true, unique: true },
  titulo: { type: String, required: true },
  sinopsis: String,
  urlPelicula: { type: String, required: true, unique: true },
  imagenPortada: String,
  anioEstreno: Number,
  generoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Genero', required: true },
  directorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Director', required: true },
  productoraId: { type: mongoose.Schema.Types.ObjectId, ref: 'Productora', required: true },
  tipoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tipo', required: true }
}, { timestamps: true });
module.exports = mongoose.model('Media', mediaSchema);