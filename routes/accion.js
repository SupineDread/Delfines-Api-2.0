'use strict';

const express = require('express');
const api = express.Router();
const accionController = require('../controllers/accion');

//Todas las rutas deben recibir un id para que se guarde en el campo de remesa (ver modelo accion)
api.put('/remesa/retiro/:id', accionController.remesaRetiro);
api.put('/remesa/cambioestancia/:id', accionController.remesaCambioEstancia);
api.put('/remesa/cambiotarifa/:id', accionController.remesaCambioTarifa);
api.put('/remesa/finalizar/:id', accionController.remesaFinalizar);
api.get('/remesa/acciones/:id', accionController.getAcciones);

module.exports = api;
