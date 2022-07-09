const HabitacionesModel = require('../models/Habitaciones.model');
const Hoteles = require('../models/Hoteles.model');
const Usuario = require('../models/Usuario.models');
const Habitaciones = require('../models/Habitaciones.model.js');


function AgregarHabitaciones(req,res){
    var params = req.body;
    var hotelId = req.params.hotelId;
    var habitacioModel = new Habitaciones();

    if(params.NumeroHabitacion){
        Habitaciones.findOne({NumeroHabitacion : params.NumeroHabitacion},(err,habitacionFineded)=>{
            if(err){
                return res.status(500)
                        .send({message:'error en la peticon 1'});
            }else if(!habitacionFineded){
                habitacioModel.NumeroHabitacion = params.NumeroHabitacion;
                habitacioModel.estado = true ;
                habitacioModel.save((err,habitacionSaved)=>{
                    if(err){
                        return res.status(500)
                            .send({message:'error en la peticion 2'});
                    }else if(habitacionSaved){
                            Hoteles.findByIdAndUpdate(hotelId,{$push:{habitaciones:habitacionSaved._id}},{new:true},(err,habiatcionUpdated)=>{
                                if(err){
                                    return res.status(500)
                                        .send({message:'error en la peticion 3'});
                                }else if(habiatcionUpdated){
                                    return res.status(200)
                                            .send({message:'habitacion agregada y guardada :D',habitacionSaved});
                                }else{
                                    return res.status(500)
                                                .send({message:'no se pudo agregar la hbaitación D:'});

                                }
                            })
                    }else{
                        return res.status(500)
                                                    .send({message:'no se pudo guardar la habitacin D:'})
                    }
                })

            }else{
                return res.status(500)
                                                        .send({message:'esta habitación ya existe :D'})
            }
        })

    }else{
        return res.status(500)
                                                            .send({message:'Debe ingresar los parametros que se le piden'})
    }
}
function EliminarHabitaciones(req,res){
    var habitacionId = req.params.idHabitacion;
    var hotelId= req.params.hotelId;
    
    Hoteles.findById(hotelId,(err,hotelfinded)=>{
        if(err){
            return res.status(500)
                .send({message:'error en la primera peticion'});
        }else if (hotelfinded){
            if(hotelfinded.habitaciones.includes(habitacionId)){
                Hoteles.findByIdAndUpdate(hotelId,{$pull:{habitaciones:habitacionId}},{new:true},(err,hotelUpdated)=>{
                    if(err){
                        return res.status(500)
                            .send({message:'error en la segunda peticion'});
                    }else if(hotelUpdated){
                        Habitaciones.findByIdAndRemove(habitacionId,(err,habitacionRemoved)=>{
                            if(err){
                                return res.status(500)
                                .send({message:'error en la tercera petiocion'});
                            }else if(habitacionRemoved){
                                return res.status(200)
                                    .send({message:'se eilimino y se removio correctamente la habitación :D',habitacionRemoved});
                            }else{
                                return res.status(500)
                                        .send({message:'no se pudo eliminar la habitacion D: '});
                            }
                        })
                    }else{
                        return res.status(500)
                                            .send({message:'no se logro remover la habitacion D:'})
                    }
                })
            }else{
                return res.status(500)
                                                .send({message:'la habitacion seleccionada ya fue eliminada o removida D:'})
            }
        }else{
            return res.status(500)
                                                    .send({message:'no se encontro el hotel D:'})
        }
    })

}

function ObtenerHabitaciones (req,res){
    var Id = req.params.idHotel;

    Hoteles.findById (Id,(err,hotelesfinded)=>{
        if(err){
            return res.status(500)
                    .send({message:'error en la primera peticion'});
        }else if(hotelesfinded){
            let a = hotelesfinded.habitaciones;
            return res.status(200)
                        .send({message:'Hoteles', a});
        }else{
            return res.status(500)
                            .send({message:'no hay hoteles'})
        }
    }).populate('a');



}

function editarhabitacion(req,res){
    var habitacionId = req.params.idHabitacion;
    var update = req.body

    Habitaciones.findOne({NumeroHabitacion: update.NumeroHabitacion},(err,habitacionencontrada)=>{
        if(err){
            return res.status(500)
                .send({mensaje:'error en la primera peticion'});

        }else if(!habitacionencontrada){
            Habitaciones.findByIdAndUpdate(habitacionId,update,{new:true},(err,habiatcionUpdated)=>{
                if(err){
                        return res.status(500)
                        .send({message:'error en la segunda peticion'});
                }else if(habiatcionUpdated){
                    return res.status(200)
                            .send({message:'la habitacion se edito con exito :D',habiatcionUpdated});
                }else{
                    return res.status(500)
                                .send({message:'no se pudo editar la habitacion D: '})
                }
            })

        }else{
            return res.status(500)
                                    .send({message:'el nuemero de habitacion ya existe'})
        }


    })

   
}



module.exports={
    AgregarHabitaciones,
    editarhabitacion,
    EliminarHabitaciones,
    ObtenerHabitaciones
}