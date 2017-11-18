const mongoose = require('mongoose');
const SHA256 = require('crypto-js/sha256');
const gravatar = require('gravatar');
const user = require('./models/user');
const app = require('./app');
const config = require('./config');

mongoose.Promise = Promise
mongoose.connect(config.db, {useMongoClient: true}, (err, res) =>{
    if(err){
        throw err;
    }else{
        console.log('Conexion correcta a la base de datos');
        app.listen(config.port, function(){
          user.findOrCreate({
            name: 'Administrador',
            username: 'Administrador',
            password: SHA256(config.password).toString(),
            avatar: gravatar.url(config.email, {s: '100', r: 'x', d: 'retro'}, true),
            email: config.email,
            pin: config.pin,
            role: 'ADMIN'}, (err, result) => {
            console.log('Se ha creado el usuario administrador');
          })
          console.log(`Servidor iniciado en el puerto ${config.port}`);
        });
    }
});
