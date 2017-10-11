'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//Importing routes
const accion_routes = require('./routes/accion');
const cliente_routes = require('./routes/cliente');
const remesa_routes = require('./routes/remesa');
const user_routes = require('./routes/user');
const acciones_routes = require('./routes/accion');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Headers
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Requested-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Using routes
app.use('/api', accion_routes);
app.use('/api', cliente_routes);
app.use('/api', remesa_routes);
app.use('/api', user_routes);
app.use('/api', accion_routes)

module.exports = app;
