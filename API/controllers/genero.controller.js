const Genero = require('../models/genero.model.js');

// Crear un genero
exports.create = (req, res) => {
    if (!req.body.nombre) {
        return res.status(400).send({ message: "El nombre del genero no puede estar vacio" });
    }

    const genero = new Genero({
        nombre: req.body.nombre,
        estado: req.body.estado,
        descripcion: req.body.descripcion
    });

    genero.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

// Todos los generos
exports.findAll = (req, res) => {
    Genero.find().then(generos => {
        res.send(generos);
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

// Un genero por id
exports.findOne = (req, res) => {
    Genero.findById(req.params.id).then(genero => {
        res.send(genero);
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

// Actualizar un genero
exports.update = (req, res) => {
    Genero.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(genero => {
        res.send(genero);
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

// Eliminar un genero
exports.delete = (req, res) => {
    Genero.findByIdAndDelete(req.params.id).then(() => {
        res.send({ message: "Genero eliminado correctamente" });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};