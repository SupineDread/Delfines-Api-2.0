'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');

mongoose.connect(config.db, {useMongoClient: true}, (err, res) =>{
    if(err){
        throw err;
    }else{
        console.log('Conexion correcta a la base de datos');
        app.listen(config.port, function(){
            console.log(`Servidor iniciado en el puerto ${config.port}`);
        });
    }
});
