'use strict';

const express = require('express');
const api = express.Router();
const clienteController = require('../controllers/cliente');
const auth = require('../middlewares/auth')

api.post('/cliente', auth.ensureAuth, clienteController.saveClient);
api.delete('/cliente/:id', auth.ensureAuth, clienteController.deleteClient);
api.put('/cliente/:id', auth.ensureAuth, clienteController.updateClient);
api.get('/cliente/:id', auth.ensureAuth, clienteController.getClient);
api.get('/clientes', auth.ensureAuth, clienteController.getClients);

module.exports = api;
