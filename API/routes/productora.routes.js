module.exports = (app) => {
    const productoras = require('../controllers/productora.controller.js');

    app.post('/productoras', productoras.create);
    app.get('/productoras', productoras.findAll);
    app.get('/productoras/:id', productoras.findOne);
    app.put('/productoras/:id', productoras.update);
    app.delete('/productoras/:id', productoras.delete);
}