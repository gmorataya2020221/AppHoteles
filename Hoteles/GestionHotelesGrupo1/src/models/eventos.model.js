const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Eventos = Schema({
    tipoEvento : Number,
    Reserva:[{type: Schema.ObjectId, ref: 'Habitaciones'}]
    
});

module.exports = mongoose.model('Eventos', Eventos);