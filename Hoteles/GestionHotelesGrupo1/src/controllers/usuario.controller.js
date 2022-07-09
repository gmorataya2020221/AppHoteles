
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt");

const Usuario = require("../models/Usuario.models");

function adminDefult() {
    var UsuarioModel = new Usuario();

    Usuario.findOne({ username: "SuperAdmin" }, (err, SuperAdminFinded) => {
        if (err) {
            console.log(err);
        } else if (SuperAdminFinded) {
            console.log("Usuario Administrador ya fue creado");
        } else {
            bcrypt.hash("123456", null, null, (err, passwordHashed) => {
                if (err) {
                    console.log("Error al encriptar contraseña de SuperAdmin");
                } else if (passwordHashed) {
                    UsuarioModel.password = passwordHashed;
                    UsuarioModel.nombre = "SuperAdmin";
                    UsuarioModel.username = "SuperAdmin";
                    UsuarioModel.rol = "ROL_Admin";
                    UsuarioModel.save((err, userSaved) => {
                        if (err) {
                            console.log("Error al crear usuario SuperAdmin");
                        } else if (userSaved) {
                            console.log("Usuario Administrador creado exitosamente");
                        } else {
                            console.log("No se creó el usuario SuperAdmin");
                        }
                    });
                } else {
                    console.log("Contraseña de SuperAdmin no encriptada");
                }
            });
        }
    });
}

function login(req,res){
    var params = req.body;
    
    if(params.username && params.password){
        Usuario.findOne({username: params.username}, (err, userFind)=>{
            if(err){
                return res.status(500).send({message: 'Error general'});
            }else if(userFind){
                bcrypt.compare(params.password, userFind.password, (err, checkPassword)=>{
                    if(err){
                        return res.status(500).send({message: 'hubo un error general en la contraseña y su verificacion D:'});
                    }else if(checkPassword){
                        if(params.getToken == 'true'){
                            return res.send({ token: jwt.crearToken(userFind)});
                        }else{
                            userFind.password = undefined;
                            return res.status(200).send({ usuario: userFind })
                        }
                    }else{
                        return res.status(401).send({message: 'La contraseña ingresada es incorrecta D:'});
                    }
                })
            }else{
                return res.send({message: 'El usuario no existe'});
            }
        })
    }else{
        return res.status(401).send({message: 'Son necesarios los parametros que se le piden'});
    }
}

function registrarAdmin(req,res){
    var UsuarioModel = new Usuario();
    var params = req.body;

    Usuario.findOne({ username: params.username},(err,userFinded)=>{
        if(err) return res.status(500)
            .send({mensaje:'error en la primera peticion'});
        if(userFinded){
            return res.status(500)
                .send({mensaje:'el usuario ya esta registrado :D'})
        }else{
            if(params.username && params.nombre && params.password){
                bcrypt.hash(params.password, null, null, (err, passwordHashed) => {
                    if (err) {
                        return res.status(500)
                        .send({message: "Error al encriptar contraseña"});
                    } else if (passwordHashed) {
                        UsuarioModel.password = passwordHashed;
                        UsuarioModel.nombre = params.name;
                        UsuarioModel.username = params.username;
                        UsuarioModel.rol ='ROL_Admin'
                        UsuarioModel.save((err, userSaved) => {
                            if (err) {
                                return res.status(500)
                                .send({message: "no se pudo agregar la empresa D:"});
                            } else if (userSaved) {
                                return res
                                    .send({message: "la empresa se agrego con exito :D",userSaved});
                            } else {
                                return res.status(500)
                                        .send({message: "no se logro agregar la empresa D:"});
                            }
                        });
                    } else {
                        console.log("Contraseña de SuperAdmin no encriptada");
                    }
                });

            }
        }

    })


}


function registrarAdminHotel(req,res){//pendiente
    var UsuarioModel = new Usuario();
    var params = req.body;

    Usuario.findOne({ username: params.username},(err,userFinded)=>{
        if(err) return res.status(500)
                .send({mensaje:'error en la primera peticion'});
        if(userFinded){
            return res.status(500)
                    .send({mensaje:'el nombre del usuario ya esta registrado'})
        }else{
            if(params.username && params.nombre && params.password){
                bcrypt.hash(params.password, null, null, (err, passwordHashed) => {
                    if (err) {
                        return res.status(500)
                            .send({message: "Error al encriptar contraseña"});
                    } else if (passwordHashed) {
                        UsuarioModel.password = passwordHashed;
                        UsuarioModel.nombre = params.name;
                        UsuarioModel.username = params.username;
                        UsuarioModel.rol ='ROL_AdminHotel'
                        UsuarioModel.save((err, userSaved) => {
                            if (err) {
                                return res.status(500)
                                .send({message: "no se pudo agregar empresa D:"});
                            } else if (userSaved) {
                               return res.status(200)
                                    .send({message:'el administrador del hotel se creo con exito :D',userSaved})
                            } else {
                                return res.status(500)
                                        .send({message: "no se pudo agregar empresa D:"});
                            }
                        });
                    } else {
                        console.log("Contraseña de SuperAdmin no encriptada");
                    }
                });

            }
        }

    })


}

function registrarUsuario(req,res){
    var UsuarioModel = new Usuario();
    var params = req.body;

    Usuario.findOne({ username: params.username},(err,userFinded)=>{
        if(err) return res.status(500)
                .send({mensaje:'error enm la primera peticion'});
        if(userFinded){
            return res.status(500)
                    .send({mensaje:'el nombre del usuario ya esta registrado :D'})
        }else{
            if(params.username && params.nombre && params.password){
                bcrypt.hash(params.password, null, null, (err, passwordHashed) => {
                    if (err) {
                        return res.status(500)
                        .send({message: "Error al encriptar contraseña"});
                    } else if (passwordHashed) {
                        UsuarioModel.password = passwordHashed;
                        UsuarioModel.nombre = params.nombre;
                        UsuarioModel.username = params.username;
                        UsuarioModel.rol ='ROL_Usuario'
                        UsuarioModel.save((err, userSaved) => {
                            if (err) {
                                return res.status(500)
                                .send({message: "no se pudo agregar empresa D:"});
                            } else if (userSaved) {
                               return res.status(500)
                                    .send({message:'se registro correctamente',userSaved})
                            } else {
                                return res.status(500)
                                        .send({message: "No se pudo agregat empresa D:"});
                            }
                        });
                    } else {
                        console.log("Contraseña de SuperAdmin no encriptada");
                    }
                });

            }
        }

    })


}

function eliminarUsuario(req,res){
    var userId= req.params.idUsuario;

    Usuario.findById(userId,(err,userFinded)=>{
        if(err){
            return res.status(500)
                                                    .send({mensaje:'error en la primera peticion'});
        }else if(userFinded){

            Usuario.findByIdAndDelete(userId,(err,userRemoved)=>{
                if(err){
                    return res.status(500)
                                                        .send({mensaje:'error en la segunda peticion'});
                }else if(userRemoved){
                    return res.status(200)
                                                            .send({mensaje:'el usuario se logro eliminar :D',userRemoved})
                }
            })
        

        }else{
            return res.status(500)
                                                                .send({mensaje:'el usuario no existe o ya lo borraron D:'});

        }

    })
     
   
}
function ObternerUsuario(req,res){
    Usuario.find({rol:"ROL_Usuario"}).exec((err,usuarioEncontrados)=>{
        if(err){
            return res.status(500)
                                                                    .send({mensaje:'error en la primera peticion'})
        }else if(usuarioEncontrados){
            return res.status(200)
                                                                        .send({mensaje:'estsos son los usuarios que existen ',usuarioEncontrados})

        }else{

        }
    })

}

function editarUsuario(req,res){
    var userId = req.params.idUsuario;
    var update = req.body

    Usuario.findById(userId,(err,userFind)=>{
        if(err) {
            return res.status(500)
                    .send({mensaje:'no se pudo encontrar el usuaroi D:'})
        } else if (userFind){
            Usuario.findOne({ username: update.username},(err,userFinded)=>{
                if(err){
                    return res.status(500)
                        .send({mensaje:'no s epudo encontarr el usuario D: '});

                }else if(userFinded){
                    if(userFinded.username=update.username){
                        Usuario.findByIdAndUpdate(userId,update,{new:true},(err,userUpdated)=>{
                            if(err){
                                return res.status(500)
                                .send({mensaje:'error en la segunda peticion'});
                            }else if(userUpdated){
                                return res.status(500)
                                    .send({message:'Usuario actualizado',userUpdated});
                            }
                        })
                    }else{
                        return res.status(500)
                                        .send({message: "Username ya existe"})
                    }
                    
                }else{
                    Usuario.findByIdAndUpdate(userId,update,{new:true},(err,userUpdated)=>{
                        if(err){
                            return res.status(500)
                                            .send({message:'error en la tercera peticon'});
                        
                        }else if (userUpdated){
                            return res.status(500)
                                                .send({message:'Usuario Actualizado',userUpdated})

                        }
                    })
                }
            })
        }
    })
}


function ObtenerUsuarioxId(req,res){
    var userId= req.params.idUsuario;
    Usuario.findById(userId,(err,userFinded)=>{
        if(err){
            return res.status(500)
                                                                            .send({mensaje:'error en la primera peticion'});
        }else if(userFinded){
            return res.status(200)
                                                                                .send({mensaje:'usuario Encontrado',userFinded});
        }else{
            return res.status(500)                                                  .send({mensaje:'no se encontro el usuario D:'});
        }
    })

}
module.exports={

    adminDefult,
    login,
    registrarAdmin,
    registrarAdminHotel,//pendiente
    registrarUsuario,
    editarUsuario,
    eliminarUsuario,
    ObternerUsuario,
    ObtenerUsuarioxId
}

