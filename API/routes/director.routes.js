module.exports = (app) => {
    const directores = require('../controllers/director.controller.js');

    app.post('/directores', directores.create);
    app.get('/directores', directores.findAll);
    app.get('/directores/:id', directores.findOne);
    app.put('/directores/:id', directores.update);
    app.delete('/directores/:id', directores.delete);
}