'use strict';

const express = require('express');
const api = express.Router();
const accionController = require('../controllers/accion');
const auth = require('../middlewares/auth')

//Todas las rutas deben recibir un id para que se guarde en el campo de remesa (ver modelo accion)
api.put('/remesa/retiro/:id', auth.ensureAuth, accionController.remesaRetiro);
api.put('/remesa/cambioestancia/:id', auth.ensureAuth, accionController.remesaCambioEstancia);
api.put('/remesa/cambiotarifa/:id', auth.ensureAuth, accionController.remesaCambioTarifa);
api.put('/remesa/finalizar/:id', auth.ensureAuth, accionController.remesaFinalizar);
api.get('/remesa/acciones/:id', auth.ensureAuth, accionController.getAcciones);

module.exports = api;
