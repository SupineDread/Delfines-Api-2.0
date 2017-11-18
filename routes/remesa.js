'use strict';

const express = require('express');
const api = express.Router();
const remesaController = require('../controllers/remesa');

//Aqui van las rutas
api.post('/remesa', remesaController.saveRemesa);
api.put('/remesa/:id', remesaController.updateRemesa);
api.delete('/remesa/:id', remesaController.deleteRemesa);
api.get('/remesa/:id', remesaController.getRemesa);
api.get('/remesas/:idCliente?', remesaController.getRemesas);
api.get('/remesas/cobros', remesaController.getCobrosHoy);

module.exports = api;
