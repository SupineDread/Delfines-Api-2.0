'use strict';

const express = require('express');
const api = express.Router();
const userController = require('../controllers/user');

//Aqui van las rutas
api.get('/user', userController.getUsers);
api.get('/user/:id', userController.getUser);
api.post('/user', userController.saveUser);
api.delete('/user/:id', userController.deleteUser);
api.put('/user/:id', userController.updateUser);

module.exports = api;
