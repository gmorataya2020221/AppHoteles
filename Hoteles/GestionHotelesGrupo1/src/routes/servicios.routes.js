
const express = require('express');
const mdAuth= require('../middlewares/autenticated.middlewares');
const servicioController = require('../controllers/servicio.controller');

var api = express.Router();


api.put("/agregarServicio/:IdHabitacion",[mdAuth.Auth, mdAuth.ensureAuthAdminHotel]
,servicioController.AgregarServicio)//necesita el ID de la Habitcion;

api.put("/editarServicio/:IdServicio",[mdAuth.Auth, mdAuth.ensureAuthAdminHotel],servicioController.editarServicio)
api.delete("/eliminarServicio/:IdServicio",[mdAuth.Auth, mdAuth.ensureAuthAdminHotel],servicioController.eliminarServicio)

module.exports = api