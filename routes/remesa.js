'use strict';

const express = require('express');
const api = express.Router();
const remesaController = require('../controllers/remesa');
const auth = require('../middlewares/auth')

//Aqui van las rutas
api.post('/remesa', auth.ensureAuth, remesaController.saveRemesa);
api.put('/remesa/:id', auth.ensureAuth, remesaController.updateRemesa);
api.delete('/remesa/:id', auth.ensureAuth, remesaController.deleteRemesa);
api.get('/remesa/:id', auth.ensureAuth, remesaController.getRemesa);
api.get('/remesas/:idCliente?', auth.ensureAuth, remesaController.getRemesas);
api.get('/remesashoy', auth.ensureAuth, remesaController.getCobrosHoy);

module.exports = api;
