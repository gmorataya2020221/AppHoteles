const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Hoteles = Schema({
    NombreHotel: String,
    direccionHotel:String,
    AdminHotel:{type: Schema.ObjectId, ref: 'Usuario'},
    eventos: [{type: Schema.ObjectId, ref: 'Eventos'}],
    habitaciones :[{type: Schema.ObjectId, ref: 'habitaciones'}],
    

});

module.exports = mongoose.model('Hoteles', Hoteles);