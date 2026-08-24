const Tipo = require('../models/tipo.model.js');

// Crear un tipo
exports.create = (req, res) => {
    if (!req.body.nombre) {
        return res.status(400).send({ message: "El nombre del tipo no puede estar vacio" });
    }

    const tipo = new Tipo({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion
    });

    tipo.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

// Todos los tipos
exports.findAll = (req, res) => {
    Tipo.find().then(tipos => {
        res.send(tipos);
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

// Un tipo por id
exports.findOne = (req, res) => {
    Tipo.findById(req.params.id).then(tipo => {
        res.send(tipo);
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

// Actualizar un tipo
exports.update = (req, res) => {
    Tipo.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(tipo => {
        res.send(tipo);
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

// Eliminar un tipo
exports.delete = (req, res) => {
    Tipo.findByIdAndDelete(req.params.id).then(() => {
        res.send({ message: "Tipo eliminado correctamente" });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};