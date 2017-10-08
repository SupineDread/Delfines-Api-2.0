'use strict';

const express = require('express');
const api = express.Router();
const accionController = require('../controllers/accion');

//Todas las rutas deben recibir un id para que se guarde en el campo de remesa (ver modelo accion)

module.exports = api;
