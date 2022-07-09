
const Usuario = require('../models/Usuario.models');
const Hoteles = require('../models/Hoteles.model');

function AgregarHoteles(req,res){
    var params = req.body;
    var HotelesModel = new Hoteles();
    var userId= req.user.sub;


        if(params.NombreHotel&&params.direccionHotel){

            HotelesModel.NombreHotel= params.NombreHotel;
            HotelesModel.direccionHotel= params.direccionHotel;
            HotelesModel.save((err,HotelSaved)=>{
                if(err){
                    return res.status(500)
                        .send({mensaje:'error en la primera peticion'});
                }else if(HotelSaved){
                    Usuario.findByIdAndUpdate(userId,{$push:{Hoteles:HotelSaved._id}},{new:true},
                        (err,hotelAgregado)=>{
                            if(err){
                                return res.status(500)
                                .send({message:'error en la segunda peticion'})
                            }else if(hotelAgregado){
                                return res.status(500)
                                    .send({mensaje:'se logro crear el hotel y se agrego con exito D: ',HotelSaved});


                            }else{
                                return res.status(500)
                                        .send({message:'no se pudo agregar un hotel al usuario D:'})

                            }
                        })

                }else{
                    return res.status(500)
                                            .send({message: "no se puede guardar el Hotel D:"})
                }
            })

        }else{ 
            return res.status(500)
                                                .send({message:'Debe cumplir con los parametros que se le piden'})
        }
}

function ElimnarHotel(req,res){
    var hotelId = req.params.idHotel;
    var userId= req.user.sub;

    Usuario.findById(userId,(err,userFinded)=>{
        if(err){
            return res.status(500)
                    .send({message:'error en la primera peticion'});

        }else if(userFinded){
            if(userFinded.Hoteles.includes(hotelId)){
                Usuario.findByIdAndUpdate(userId,{$pull:{Hoteles:hotelId}},{new:true},(err,hotelUpdated)=>{
                    if(err){
                        return res.status(500)
                        .send({message:'error en la segunda peticion'});

                    }else if(hotelUpdated){
                        Hoteles.findByIdAndRemove(hotelId,(err,hotelRemoved)=>{
                            if(err){
                                return res.status(500)
                                    .send({message:'error en la tercera peticion'});

                            }else if(hotelRemoved){
                                return res.status(200)
                                        .send({message:'el hotel seleccionado se removio y se logro actaulizar :D',hotelRemoved})
                            }else{
                                return res.status(500)
                                            .send({message:'no se pudo remover el hotel D:'})
                            }
                        })

                    }else{
                        return res.status(500)
                                                .send({message:'no se puede actalizar el usuario D:'})
                    }
                })
            }
        }else{
            return res.status(500)
                                                    .send({message:'no se encontro el hotel D:'})
        }
    })
    
}
function ObtenerHoteles (req,res){
    var userId = req.user.sub;

    Usuario.findById(userId,(err,hotelesfinded)=>{
        if(err){
            return res.status(500)
                .send({message:'error en la primera petición'});
        }else if(hotelesfinded){
            let hoteles = hotelesfinded.Hoteles;
            return res.status(200)
                    .send({message:'Hoteles', hoteles});
        }else{
            return res.status(500)
                        .send({message:'no hay hoteles'})
        }}).populate('Hoteles');



}

function EditarHoteles(req,res){
    var idHotel = req.params.idHotel;
    var update = req.body;
    
    Hoteles.findByIdAndUpdate(idHotel,update,{new:true},(err,hotelUpdated)=>{
        if(err){
            return res.status(500)
                .send({message:'error en la primerad peticion'});

        }else if(hotelUpdated){
            return res.status(200)
                    .send({message:'hotel Actualizado',hotelUpdated});

        }else{
            return res.status(500)
                        .send({message:'no se pudo ediatar el hotel D:'})
        }
    })


}

function ObtenerHotelesxId(req,res){
    var hotelId = req.params.idHotel;

    Hoteles.findById(hotelId,(err,hotelfinded)=>{
        if(err){
            return res.status(500)
                    .send({message:'error en la primera peticion'});
        }else if(hotelesfinded){
            return res.status(200)
                        .send({message:'Hotel',hotelesfinded});
        }else{
            return res.status(500)
                            .send({message:'no se logro obtener el hotel D:'})
        }
    })
}

module.exports={
    AgregarHoteles,
    EditarHoteles,
    ElimnarHotel,
    ObtenerHoteles,
    ObtenerHotelesxId
}