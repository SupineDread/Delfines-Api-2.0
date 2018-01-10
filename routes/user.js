'use strict';

const express = require('express');
const api = express.Router();
const userController = require('../controllers/user');
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')

//Estas rutas solo las ve el administrador
api.get('/users', [auth.ensureAuth, admin .isAdmin], userController.getUsers);
api.get('/user/:id', [auth.ensureAuth, admin .isAdmin], userController.getUser);
api.post('/user',[auth.ensureAuth, admin.isAdmin], userController.saveUser);
api.delete('/user/:id',[auth.ensureAuth, admin.isAdmin], userController.deleteUser);
api.put('/user/:id', auth.ensureAuth, userController.updateUser);

api.post('/login', userController.login)

module.exports = api;
