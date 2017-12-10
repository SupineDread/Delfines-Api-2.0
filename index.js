const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const gravatar = require('gravatar');
const findOrCreate = require('mongoose-find-or-create')
const user = require('./models/user');
const app = require('./app');
const config = require('./config');

mongoose.Promise = Promise
mongoose.connect(config.db, {useMongoClient: true}, (err, res) =>{
    if(err){
        throw err;
    }else{
        console.log('Conexion correcta a la base de datos');
        bcrypt.hash("cacr2205", null, null, (err, hash)=>{
          user.findOrCreate({
            password: hash,
            name: 'Administrador',
            username: 'Administrador',
            avatar: gravatar.url('cacr@mail.com', {s: '100', r: 'x', d: 'retro'}, true),
            email: 'cacr@mail.com',
            pin: 1000,
            role: 'ADMIN'
          }, (err, result) => {
            console.log('Usuario administrador encontrado o creado');
          })
        })
        app.listen(config.port, function(){
          console.log(`Servidor iniciado en el puerto ${config.port}`);
        });
    }
});
