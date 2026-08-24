const Director = require('../app/models/director.model.js');

// Crear un director
exports.create = (req, res) => {
    if (!req.body.nombres) {
        return res.status(400).send({ message: "El nombre del director no puede estar vacio" });
    }

    const director = new Director({
        nombres: req.body.nombres,
        estado: req.body.estado
    });

    director.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

// Todos los directores
exports.findAll = (req, res) => {
    Director.find().then(directores => {
        res.send(directores);
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

// Un director por id
exports.findOne = (req, res) => {
    Director.findById(req.params.id).then(director => {
        res.send(director);
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

// Actualizar un director
exports.update = (req, res) => {
    Director.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(director => {
        res.send(director);
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

// Eliminar un director
exports.delete = (req, res) => {
    Director.findByIdAndDelete(req.params.id).then(() => {
        res.send({ message: "Director eliminado correctamente" });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};