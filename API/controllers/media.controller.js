const Media = require('../models/media.model.js');

// Crear una media (pelicula o serie)
exports.create = (req, res) => {
    if (!req.body.serial || !req.body.titulo || !req.body.urlPelicula) {
        return res.status(400).send({ message: "Serial, titulo y urlPelicula son obligatorios" });
    }

    const media = new Media({
        serial: req.body.serial,
        titulo: req.body.titulo,
        sinopsis: req.body.sinopsis,
        urlPelicula: req.body.urlPelicula,
        imagenPortada: req.body.imagenPortada,
        anioEstreno: req.body.anioEstreno,
        generoId: req.body.generoId,
        directorId: req.body.directorId,
        productoraId: req.body.productoraId,
        tipoId: req.body.tipoId
    });

    media.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

// Todas las medias
exports.findAll = (req, res) => {
    Media.find()
        .populate('generoId')
        .populate('directorId')
        .populate('productoraId')
        .populate('tipoId')
        .then(medias => {
            res.send(medias);
        }).catch(err => {
            res.status(500).send({ message: err.message });
        });
};

// Una media por id
exports.findOne = (req, res) => {
    Media.findById(req.params.id)
        .populate('generoId')
        .populate('directorId')
        .populate('productoraId')
        .populate('tipoId')
        .then(media => {
            res.send(media);
        }).catch(err => {
            res.status(500).send({ message: err.message });
        });
};

// Actualizar una media
exports.update = (req, res) => {
    Media.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(media => {
        res.send(media);
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

// Eliminar una media
exports.delete = (req, res) => {
    Media.findByIdAndDelete(req.params.id).then(() => {
        res.send({ message: "Media eliminada correctamente" });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};