'use strict';

const express = require('express');
const api = express.Router();
const clienteController = require('../controllers/cliente');

//Aqui van las rutas
api.post('/cliente', clienteController.saveClient);
api.delete('/cliente/:id', clienteController.deleteClient);
api.put('/cliente/:id', clienteController.updateClient);
api.get('/cliente/:id', clienteController.getClient);
api.get('/cliente', clienteController.getClients);

module.exports = api;
