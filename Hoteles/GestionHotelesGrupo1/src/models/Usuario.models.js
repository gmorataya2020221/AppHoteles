const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Usuario = Schema({
    nombre:String,
    username:String,
    rol:String,
    password:String,
    Hoteles: [{type: Schema.ObjectId, ref: 'Hoteles'}],
    habitacion:[{type: Schema.ObjectId, ref: 'habitacion'}],
    Facturas:[{type: Schema.ObjectId, ref: 'Facturas'}]
});

module.exports = mongoose.model('Usuario', Usuario);