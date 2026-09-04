const Productora = require('../app/models/productora.model.js');

// Crear una productora
exports.create = (req, res) => {
    if (!req.body.nombre) {
        return res.status(400).send({ message: "El nombre de la productora no puede estar vacio" });
    }

    const productora = new Productora({
        nombre: req.body.nombre,
        estado: req.body.estado,
        slogan: req.body.slogan,
        descripcion: req.body.descripcion
    });

    productora.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

// Todas las productoras
exports.findAll = (req, res) => {
    Productora.find().then(productoras => {
        res.send(productoras);
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

// Una productora por id
exports.findOne = (req, res) => {
    Productora.findById(req.params.id).then(productora => {
        res.send(productora);
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

// Actualizar una productora
exports.update = (req, res) => {
    Productora.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(productora => {
        res.send(productora);
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

// Eliminar una productora
exports.delete = (req, res) => {
    Productora.findByIdAndDelete(req.params.id).then(() => {
        res.send({ message: "Productora eliminada correctamente" });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};