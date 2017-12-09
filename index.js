const mongoose = require('mongoose');
const user = require('./models/user');
const app = require('./app');
const config = require('./config');

mongoose.Promise = Promise
mongoose.connect(config.db, {useMongoClient: true}, (err, res) =>{
    if(err){
        throw err;
    }else{
        console.log('Conexion correcta a la base de datos');
        user.findOrCreate(config.userAdmin, (err, result) => {
          console.log('Usuario administrador encontrado o creado');
        })
        app.listen(config.port, function(){
          console.log(`Servidor iniciado en el puerto ${config.port}`);
        });
    }
});
