const express = require('express');
const habitacionescontroller = require('../controllers/Habitaciones.controller');
const mdAuth = require('../middlewares/autenticated.middlewares');

 var api = express.Router();

 api.put("/agregarHabitacion/:hotelId",[mdAuth.Auth, mdAuth.ensureAuthAdminHotel],
 habitacionescontroller.AgregarHabitaciones);//necesita el ID del Hotel(validaciones No necesarias)
 
 api.put("/editarhabitacion/:idHabitacion",[mdAuth.Auth, mdAuth.ensureAuthAdminHotel],
 habitacionescontroller.editarhabitacion);// necesita el ID de la habitacion(validaciones hechas Y necesarias)

 api.put("/eliminarHabitacion/:hotelId/:idHabitacion",[mdAuth.Auth, mdAuth.ensureAuthAdminHotel],
 habitacionescontroller.EliminarHabitaciones);// necesita el ID del hotel y el ID de la habitacion (validaciones hechas y no necesarias);

 api.get("/obtenerHabitaciones/:idHotel",[mdAuth.Auth, mdAuth.ensureAuthAdminHotel],
 habitacionescontroller.ObtenerHabitaciones);// necesita el ID del hotel(validaciones No necesarias);



 module.exports = api