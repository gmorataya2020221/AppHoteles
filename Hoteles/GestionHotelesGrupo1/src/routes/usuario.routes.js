const express = require("express");
const userController = require("../controllers/usuario.controller");
const mdAuth = require("../middlewares/autenticated.middlewares");

var api = express.Router();
api.post("/login", userController.login);// login
api.post("/RegistrarAdmin",[mdAuth.Auth, mdAuth.ensureAuthAdmin],userController.registrarAdmin);
api.post("/RegistrarAdminHotel",[mdAuth.Auth, mdAuth.ensureAuthAdmin],userController.registrarAdminHotel);
api.post("/registrarUsuario",userController.registrarUsuario);
api.put("/EditarUsuario/:idUsuario",[mdAuth.Auth,mdAuth.ensureAuthUser],userController.editarUsuario)//necesita el ID del Usuario (faltan validadciones sobre el mismo {no necesarias})
api.delete("/eliminarUsuario/:idUsuario",[mdAuth.Auth, mdAuth.ensureAuthUser],userController.eliminarUsuario);
api.get("/obtenerUsuarios",[mdAuth.Auth, mdAuth.ensureAuthAdmin],userController.ObternerUsuario);
api.get("/obtenerUsuariosXid/:idUsuario",[mdAuth.Auth, mdAuth.ensureAuthAdmin],userController.ObtenerUsuarioxId);//necesita el ID del usuario (NO HACER VALIDACIONES)
module.exports = api;