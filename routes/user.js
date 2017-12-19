'use strict';

const express = require('express');
const api = express.Router();
const userController = require('../controllers/user');
const auth = require('../middlewares/auth')

//Estas rutas solo las ve el administrador
api.get('/users', userController.getUsers);
api.get('/user/:id', userController.getUser);
api.post('/user', userController.saveUser);
api.delete('/user/:id', userController.deleteUser);
api.put('/user/:id', userController.updateUser);

api.post('/login', userController.login)

module.exports = api;
