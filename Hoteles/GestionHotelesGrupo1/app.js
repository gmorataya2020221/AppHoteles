const express = require('express');
const cors = require('cors');
const app = express();

//importaciones
const Usuario = require('./src/routes/usuario.routes');
const Hoteles = require('./src/routes/Hoteles.routes');
const Habitaciones = require('./src/routes/habitaciones.routes');
const Servicios = require('./src/routes/servicios.routes');


app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.use(cors());

app.use('/api',Usuario,Hoteles,Habitaciones);

module.exports = app;