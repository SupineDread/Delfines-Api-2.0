'use strict';

const User = require('../models/user');
const gravatar = require('gravatar');
const AES =  require('crypto-js/aes');
const config = require('../config');

function saveUser(req, res) {
  let user = new User();
  let params = req.body;
  user.name = params.nombre;
  user.username = params.username;
  let pass = AES.encrypt(params.password, config.key);
  user.password = pass.toString();
  user.email = params.email;
  user.avatar = gravatar.url(params.email, {s: '100', r: 'x', d: 'retro'}, true);
  user.pin =  Math.floor(Math.random()*(9999 - 1001) + 1000);

  user.save((err, userSaved)=>{
    if(err){console.log(err);return res.status(500).send({message: 'Error con el servidor al guardar al usuario'});}
    if(!userSaved) return res.status(404).send({message: 'No hay usuario por guardar'});
    return res.status(200).send({usuario: userSaved});
  });

}

function getUser(req, res) {
  let userId = req.params.id;

  User.findById(userId, function(err, user){
    if(err) res.status(500).send({message: 'No se ha podido obtener el usuario'});
    if(!user) res.status(404).send({message: 'No existe el usuario'});
    res.status(200).send({user});
  });
}

function getUsers(req, res) {
  User.find({}).exec ((err, users)=>{
    if(err) res.status(500).send({messsage: 'Error al obtener los usuarios'});
    if(!users) res.status(404).send({message: 'No hay usuarios'});
    res.status(200).send({users});
  })
}

function deleteUser(req, res) {
  let userId = req.params.id;

  User.findByIdAndRemove(userId, (err, userDeleted)=>{
    if(err) res.status(500).send({message: 'Error con el servidor al eliminar al usuario'});
    if(!userDeleted) res.status(404).send({message: 'No hay usuario por eliminar'});
    res.status(200).send({message: 'Se ha eliminado el usuario con exito', userDeleted});
  });
}

function updateUser(req, res) {
  let userId = req.params.id;
  let update = req.body;

  User.findByIdAndUpdate(userId, update, (err, userUpdated)=>{
    if(err) res.status(500).send({message: 'Error al actualizar el usuario'});
    if(!userUpdated) res.status(404).send({message: 'No hay usuario por actualizar'});
    res.status(200).send({userUpdated});
  });
}

module.exports = {
  saveUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser
}
