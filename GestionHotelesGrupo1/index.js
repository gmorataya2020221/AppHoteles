const mongoose = require('mongoose');
const app = require('./app');
var admin = require("./src/controllers/usuario.controller");

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/GestionHoteles',{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{

    console.log('se encuentra conectado a la base de datos');

    app.listen(3000, function(){
        admin.adminDefult();
        console.log('conectado al puerto 3000');
    })
}).catch(err => console.log(err));
//RegistrarAdminDefault();