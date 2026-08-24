module.exports = (app) => {
    const generos = require('../controllers/genero.controller.js');

    app.post('/generos', generos.create);
    app.get('/generos', generos.findAll);
    app.get('/generos/:id', generos.findOne);
    app.put('/generos/:id', generos.update);
    app.delete('/generos/:id', generos.delete);
}