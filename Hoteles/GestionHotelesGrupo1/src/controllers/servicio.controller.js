const Habitacion = require('../models/Habitaciones.model');
const Servicio = require('../models/Servicios.model');

function AgregarServicio(req,res){
    var params = req.body;
    var ServicioModel = new Servicio();
    var HabtacionId= req.params.IdHabitacion;

    if(params.nombreServicio && params.costoServicio){

        ServicioModel.nombreServicio = params.nombreServicio;
        ServicioModel.costoServicio= params.costoServicio;
        ServicioModel.save((err,ServicioCreado)=>{
            if(err)return res.status(500)
                .send({mensaje:'error en la primera peticion'});
            if(ServicioCreado){
                Habitacion.findByIdAndUpdate(HabtacionId,{$push:{Servicios:ServicioCreado._id}},{new:true},(err,ServicioAgregado)=>{
                    if(err)return res.status(500)
                    .send({mensaje:'no se pudo agegar el servicio D:'});
                    if(ServicioAgregado){
                        return res.status(500)
                        .send({mensaje:'se creo el servicio y se logro agregar con exito :D'});

                    }else{
                        return res.status(500)
                            .send({mensaje:'no se logro agregar el servicio D:'})
                    }

                })
            }else{
                return res.status(500)
                                .send({mensaje:'no se logra guardar el servicio'})
            }
        })


    }
    



}

function editarServicio(req,res){
    var servicioId = req.params.IdServicio;

    Servicios.findByIdAndUpdate(servicioId,(err,servicioUpdated)=>{
        if(err){
            return res.status(500)
                .send({mensaje:'error en la petiocion'});
        }else if(serviciofinded){
            return res.status(200)
                    .send({mensaje:'servicio Editado'},servicioUpdated);
        }else{
            return res.status(500)
                        .send({mensaje:'no se puede editar el servicio'});
        }

    })

}

function eliminarServicio(req,res){

}
module.exports ={
    AgregarServicio,
    editarServicio,
    eliminarServicio
}