const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.json());
var port = process.env.PORT || 3000;


const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

//Agregar las rutas
require('./routes/director.routes.js')(app);
//Iniciar la conexión a la base de datos
mongoose.connect(dbConfig.url).then(() => {
    console.log("Conexión a la base de datos exitosa");
}).catch(err => {
    console.log('No se pudo conectar a la base de datos', err);
    process.exit();
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});

