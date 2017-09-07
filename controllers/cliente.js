'use strict';

const Cliente = require('../models/cliente');

function saveClient(req, res) {
  let client = new Cliente();
  let params = req.body;
  client.name = params.name;
  client.apodo = params.apodo;

  client.save((err, clientSaved)=>{
    if(err) res.status(500).send({message: 'Error al guardar el cliente'});
    if(!clientSaved) res.status(404).send({message: 'No se ha podido guardar el cliente'});
    res.status(200).send({cliente: clientSaved});
  });
}

function deleteClient(req, res) {
  let clientId = req.params.id;

  Cliente.findById(clienteId, function(err, cliente){
    if (err) res.status(500).send({message: 'No se ha podiro encontra el cliente'});
    if(!cliente) res.status(404).send({message: 'No se ha encontrado el cliente a borrar'});
    cliente.remove(err=>{
      if(err) res.status(500).send({message: 'No se ha podido borrar el cliente'});
      res.status(200).send({message: 'Se ha borrado el cliete con exito'});
    });
  });
}

function updateClient(req, res) {
  let clienteId = req.params.id;
  let update = req.body;

  Cliente.findByIdAndUpdate(clienteId, update, function(err, clienteUpdated){
    if(err) res.status(500).send({message: 'No se ha podido actualizar el cliente'});
    if(!clienteUpdated) res.statud(404).send({message: 'No hay cliente por actualizar'});
    res.status(200).send({cliente: clienteUpdated});
  });
}

function getClient(req, res) {
  let clienteId = req.params.id;

  Cliente.findById(clienteId, function(err, cliente){
    if(err) res.status(500).send({message: 'No se ha podido obtener el cliente'});
    if(!cliente) res.status(404).send({message: 'No existe el provedor'});
    res.status(200).send({cliente});
  });
}

function getClients(req, res) {
  Cliente.find({}).exec ((err, clientes)=>{
    if(err) res.status(500).send({messsage: 'Error al obtener los clientes'});
    if(!clientes) res.status(404).send({message: 'No hay clientes'});
    res.status(200).send({clientes});
  })
}
module.exports = {
  saveClient,
  deleteClient,
  updateClient,
  getClient,
  getClients
}
