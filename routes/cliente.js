'use strict';

const express = require('express');
const api = express.Router();
const clienteController = require('../controllers/cliente');

//Aqui van las rutas
api.post('/addclient', clienteController.saveClient);
api.delete('/deleteclient/:id', clienteController.deleteClient);
api.put('/updateclient/:id', clienteController.updateClient);
api.get('/getclient/:id', clienteController.getClient);
api.get('/getclients', clienteController.getClients);

module.exports = api;
