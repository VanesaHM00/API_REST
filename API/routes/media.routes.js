module.exports = (app) => {
    const medias = require('../controllers/media.controller.js');

    app.post('/medias', medias.create);
    app.get('/medias', medias.findAll);
    app.get('/medias/:id', medias.findOne);
    app.put('/medias/:id', medias.update);
    app.delete('/medias/:id', medias.delete);
}