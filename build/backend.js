/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const jwt = __webpack_require__(11)
const moment = __webpack_require__(2)
const config = ('../config')

const clave = 'clavedetokenasibiensecretaquenadiesabe'

exports.ensureAuth = function(req, res, next){
  if (!req.headers.authorization) {
    return res.status(200).send({message: 'Necesitas estar autenticado para acceder a esta funcion'})
  }

  let token = req.headers.authorization.replace(/['"]+/g, '')

  try{
    let payload = jwt.decode(token, clave)

    req.user =  payload

    if (payload.exp <= moment().unix()) {
      return res.status(401).send({message: 'El token ha expirado'})
    }
  }catch(ex){
    return res.status(404).send({message: 'El token no es valido'})
  }

  next();
}


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("bcrypt-nodejs");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("gravatar");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("mongoose-find-or-create");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const mongoose = __webpack_require__(0)
const findOrCreate = __webpack_require__(6)
const Schema = mongoose.Schema;

const UserSchema = Schema({
  name: String,
  username: String,
  password: {
    type: String
  },
  pin: {
    type:String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  avatar: {
    type: String
  },
  role:{
    type: String
  }
});

UserSchema.plugin(findOrCreate)

module.exports = mongoose.model('User', UserSchema);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const express = __webpack_require__(1);
const api = express.Router();
const accionController = __webpack_require__(17);
const auth = __webpack_require__(3)

//Todas las rutas deben recibir un id para que se guarde en el campo de remesa (ver modelo accion)
api.put('/remesa/retiro/:id', auth.ensureAuth, accionController.remesaRetiro);
api.put('/remesa/cambioestancia/:id', auth.ensureAuth, accionController.remesaCambioEstancia);
api.put('/remesa/cambiotarifa/:id', auth.ensureAuth, accionController.remesaCambioTarifa);
api.put('/remesa/finalizar/:id', auth.ensureAuth, accionController.remesaFinalizar);
api.get('/remesa/acciones/:id', auth.ensureAuth, accionController.getAcciones);

module.exports = api;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const mongoose = __webpack_require__(0);
const Schema = mongoose.Schema;

var RemesaSchema = Schema({
  //Muchas remesas pertenecen a un cliente (muchas imagenes pertenecen a un album)
  cliente: {
    type: Schema.ObjectId,
    ref: 'Cliente'
  },
  nombreProducto: {
    type: String,
    required: true,
  },
  tipoEmpaquetado: {
    type:String,
    required: true
  },
  cantidadEmpaques: {
    type: Number,
    required: true
  },
  peso: {
    type:Number,
    required: true
  },
  pesoPromedio: {
    type: Number
  },
  tarifa: {
    type:Number,
    required: true
  },
  estancia: {
    type: Number,
    enum: [1,2,3,4,5]
  },
  status: {
    type: String,
    enum: ['STATUS_ACTIVO', 'STATUS_INACTIVO'],
    default: 'STATUS_ACTIVO',
    required: true
  },
  fechaEntrada: {
    type: String
  },
  proximaFechaCobro: {
    type: String
  }
});

module.exports = mongoose.model('Remesa', RemesaSchema);


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const mongoose = __webpack_require__(0);

const EntradaSchema =  mongoose.Schema({
  remesa: {
    type: mongoose.Schema.ObjectId,
    ref: 'Remesa'
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  fechaIngreso:{
    type: String
  }
});

module.exports = mongoose.model('Entrada', EntradaSchema);


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("jwt-simple");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const mongoose = __webpack_require__(0);
const Schema = mongoose.Schema;

var ClienteSchema = Schema({
  name: {
    type: String,
    required: true
  },
  apodo: {
    type: String,
    default: null
  }
});

module.exports = mongoose.model('Cliente', ClienteSchema);


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports={
  port: process.env.PORT || 7770,
  db: process.env.MONGODB || 'mongodb://admin:cacr2205@ds036577.mlab.com:36577/congelados-delfines',
  //db: process.env.MONGODB || 'mongodb://localhost:27017/delfines',

}


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

const mongoose = __webpack_require__(0);
const bcrypt = __webpack_require__(4);
const gravatar = __webpack_require__(5);
const findOrCreate = __webpack_require__(6)
const user = __webpack_require__(7);
const app = __webpack_require__(15);
const config = __webpack_require__(13);

mongoose.Promise = Promise
mongoose.connect(config.db, {useMongoClient: true}, (err, res) =>{
    if(err){
        throw err;
    }else{
        console.log('Conexion correcta a la base de datos');
        bcrypt.hash("cacr2205", null, null, (err, hash)=>{
          user.findOrCreate({
            password: hash,
            name: 'Administrador',
            username: 'Administrador',
            avatar: gravatar.url('cacr@mail.com', {s: '100', r: 'x', d: 'retro'}, true),
            email: 'cacr@mail.com',
            pin: 1000,
            role: 'ADMIN'
          }, (err, result) => {
            console.log('Usuario administrador encontrado o creado');
          })
        })
        app.listen(config.port, function(){
          console.log(`Servidor iniciado en el puerto ${config.port}`);
        });
    }
});


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const express = __webpack_require__(1);
const bodyParser = __webpack_require__(16);
const app = express();

//Importing routes
const accion_routes = __webpack_require__(8);
const cliente_routes = __webpack_require__(22);
const remesa_routes = __webpack_require__(24);
const user_routes = __webpack_require__(26);
const acciones_routes = __webpack_require__(8);

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


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const moment = __webpack_require__(2);
const Remesa = __webpack_require__(9);
const accionRetiro = __webpack_require__(18);
const accionCambioTarifa = __webpack_require__(19);
const accionCambioEstancia = __webpack_require__(20);
const accionFinalizar = __webpack_require__(21);
const accionEntrada = __webpack_require__(10);

function remesaRetiro(req, res) {
  let remesaId = req.params.id;
  let cantidadretirada = req.body.cantidadretirada;

  Remesa.findById(remesaId, (err, remesa)=>{
    if (err) return res.status(500).send({message: 'Error al obtener la remesa'});
    if (!remesa) return res.status(404).send({message: 'No hay remesa'});

    Remesa.findByIdAndUpdate(remesaId, {cantidadEmpaques: remesa.cantidadEmpaques-cantidadretirada}, (err, remesaUpdated)=>{
      if(err) res.status(500).send({message: 'Error al actualizar la remesa'});
      if(!remesaUpdated) res.status(404).send({message: 'No hay remesa por guardar'});
      //res.status(200).send({remesaUpdated});

      let retiro =  new accionRetiro();
      retiro.remesa = remesaUpdated._id;
      retiro.user = req.user.sub;
      retiro.cantidadretirada = cantidadretirada;
      retiro.fechaRetiro =  moment().format('MMMM Do YYYY, h:mm a');

      retiro.save((err, retiroSaved)=>{
        if(err) res.status(500).send({message: 'Error con el servidor al guardar la entrada de remesa'});
        if(!retiroSaved) res.status(404).send({message: 'No hay entrada por guardar'});
        res.status(200).send({remesaUpdated});
      });
    });
  });
}

function remesaCambioEstancia(req, res) {
  let remesaId = req.params.id;
  let nuevaEstancia = req.body.nuevaestancia;

  Remesa.findById(remesaId, (err, remesa)=>{
    if (err) return res.status(500).send({message: 'Error al obtener la remesa'});
    if (!remesa) return res.status(404).send({message: 'No hay remesa'});

    Remesa.findByIdAndUpdate(remesaId, {estancia: nuevaEstancia}, (err, remesaUpdated)=>{
      if(err) res.status(500).send({message: 'Error al actualizar la remesa'});
      if(!remesaUpdated) res.status(404).send({message: 'No hay remesa por guardar'});

      let estancia = new accionCambioEstancia();
      estancia.remesa = remesaUpdated._id;
      estancia.user = req.user.sub;
      estancia.nuevaestancia = nuevaEstancia;
      estancia.fechaCambio = moment().format('MMMM Do YYYY, h:mm a');

      estancia.save((err, estanciaSaved)=>{
        if(err) res.status(500).send({message: 'Error con el servidor al guardar la entrada de remesa'});
        if(!estanciaSaved) res.status(404).send({message: 'No hay entrada por guardar'});
        res.status(200).send({remesaUpdated});
      });
    });
  });
}

function remesaCambioTarifa(req, res) {
  let remesaId = req.params.id;
  let nuevaTarifa = req.body.nuevatarifa;

  Remesa.findById(remesaId, (err, remesa)=>{
    if (err) return res.status(500).send({message: 'Error al obtener la remesa'});
    if (!remesa) return res.status(404).send({message: 'No hay remesa por actualizar'});

    Remesa.findByIdAndUpdate(remesaId, {tarifa: nuevaTarifa}, (err, remesaUpdated)=>{
      if(err) res.status(500).send({message: 'Error al actualizar la remesa'});
      if(!remesaUpdated) res.status(404).send({message: 'No hay remesa por guardar'});
      //res.status(200).send({remesaUpdated});

      let tarifa = new accionCambioTarifa();
      tarifa.remesa = remesaUpdated._id;
      tarifa.user = req.user.sub;
      tarifa.nuevatarifa = nuevaTarifa;
      tarifa.fechaCambio = moment().format('MMMM Do YYYY, h:mm a');

      tarifa.save((err, tarifaSaved)=>{
        if(err) res.status(500).send({message: 'Error con el servidor al guardar el cambio de tarifa'});
        if(!tarifaSaved) res.status(404).send({message: 'No hay cambio de tarifa por guardar'});
        res.status(200).send({remesaUpdated});
      });
    });
  });
}

function remesaFinalizar(req, res) {
  let remesaId = req.params.id;

  Remesa.findById(remesaId, (err, remesa)=>{
    if (err) return res.status(500).send({message: 'Error al obtener la remesa'});
    if (!remesa) return res.status(404).send({message: 'No hay remesa por actualizar'});

    Remesa.findByIdAndUpdate(remesaId, {status: 'STATUS_INACTIVO'}, (err, remesaUpdated)=>{
      if(err) res.status(500).send({message: 'Error al actualizar la remesa'});
      if(!remesaUpdated) res.status(404).send({message: 'No hay remesa por guardar'});

      let finalizar = new accionFinalizar();
      finalizar.remesa = remesaUpdated._id;
      finalizar.user = req.user.sub;
      finalizar.fechaFinalizar = moment().format('MMMM Do YYYY, h:mm a');

      finalizar.save((err, finalizarSaved)=>{
        if(err) res.status(500).send({message: 'Error con el servidor al guardar la entrada de remesa'});
        if(!finalizarSaved) res.status(404).send({message: 'No hay finalizar por guardar'});
        res.status(200).send({remesaUpdated});
      });
    })
  });
}

function getAcciones(req, res) {
  let remesaId = req.params.id;

  accionEntrada.find({remesa: remesaId}).populate({path:'user'}).populate({path: 'remesa'}).exec ((err, entradas)=>{
    if(err) res.status(500).send({messsage: 'Error al obtener las entradas'});
    if(!entradas) res.status(404).send({message: 'No hay entradas'});
    /*Remesa.populate(entradas, {path: 'remesa'}, (err, entradas)=>{

    });*/

    accionFinalizar.find({remesa: remesaId}).populate({path:'user'}).populate({path: 'remesa'}).exec ((err, finalizadas)=>{
      if(err) res.status(500).send({messsage: 'Error al obtener las acciones de finalizar'});
      if(!finalizadas) res.status(404).send({message: 'No hay acciones de finalizar'});

      accionCambioEstancia.find({remesa:remesaId}).populate({path: 'user'}).populate({path: 'remesa'}).exec ((err, cambioestancia)=>{
        if(err) res.status(500).send({messsage: 'Error al obtener las acciones de cambio de estancia'});
        if(!cambioestancia) res.status(404).send({message: 'No hay acciones de cambio de estancia'});

        accionCambioTarifa.find({remesa: remesaId}).populate({path: 'user'}).populate({path: 'remesa'}).exec ((err, cambiotarifas)=>{
          if(err) res.status(500).send({messsage: 'Error al obtener las acciones de cambio de tarifa'});
          if(!cambiotarifas) res.status(404).send({message: 'No hay acciones de cambio de tarifa'});

          accionRetiro.find({remesa: remesaId}).populate({path: 'user'}).populate({path: 'remesa'}).exec ((err, accionretiros)=>{
            if(err) res.status(500).send({messsage: 'Error al obtener las acciones de retiro'});
            if(!accionretiros) res.status(404).send({message: 'No hay acciones de retiro'});

            res.status(200).send({entradas, accionretiros, cambiotarifas, cambioestancia, finalizadas});
          });
        });
      });
    });
  });
}

module.exports = {
  remesaRetiro,
  remesaCambioEstancia,
  remesaCambioTarifa,
  remesaFinalizar,
  getAcciones
}


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const mongoose = __webpack_require__(0);

const RetiroSchema =  mongoose.Schema({
  remesa: {
    type: mongoose.Schema.ObjectId,
    ref: 'Remesa'
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  fechaRetiro:{
    type: String
  },
  cantidadRetirada: {
    type: String
  }
});

module.exports = mongoose.model('Retiro', RetiroSchema);


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const mongoose = __webpack_require__(0);

const TarifaSchema =  mongoose.Schema({
  remesa: {
    type: mongoose.Schema.ObjectId,
    ref: 'Remesa'
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  fechaCambio:{
    type: String
  },
  nuevatarifa: {
    type: Number
  }
});

module.exports = mongoose.model('Tarifa', TarifaSchema);


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const mongoose = __webpack_require__(0);

const EstanciaSchema =  mongoose.Schema({
  remesa: {
    type: mongoose.Schema.ObjectId,
    ref: 'Remesa'
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  fechaCambio:{
    type: String
  },
  nuevaestancia: {
    type: Number
  }
});

module.exports = mongoose.model('Estancia', EstanciaSchema);


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const mongoose = __webpack_require__(0);

const FinalizarSchema =  mongoose.Schema({
  remesa: {
    type: mongoose.Schema.ObjectId,
    ref: 'Remesa'
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  fechaFinalizar:{
    type: String
  }
});

module.exports = mongoose.model('Finalizar', FinalizarSchema);


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const express = __webpack_require__(1);
const api = express.Router();
const clienteController = __webpack_require__(23);
const auth = __webpack_require__(3)

api.post('/cliente', auth.ensureAuth, clienteController.saveClient);
api.delete('/cliente/:id', auth.ensureAuth, clienteController.deleteClient);
api.put('/cliente/:id', auth.ensureAuth, clienteController.updateClient);
api.get('/cliente/:id', auth.ensureAuth, clienteController.getClient);
api.get('/clientes', auth.ensureAuth, clienteController.getClients);

module.exports = api;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Cliente = __webpack_require__(12);

function saveClient(req, res) {
  let client = new Cliente();
  let params = req.body;
  client.name = params.name;
  client.apodo = params.apodo;

  client.save((err, clientSaved)=>{
    if(err) res.status(500).send({message: 'Error al guardar el cliente'});
    if(!clientSaved) res.status(404).send({message: 'No se ha podido guardar el cliente'});
    res.status(200).send({cliente: clientSaved});
  });
}

function deleteClient(req, res) {
  let clientId = req.params.id;

  Cliente.findById(clienteId, function(err, cliente){
    if (err) res.status(500).send({message: 'No se ha podiro encontra el cliente'});
    if(!cliente) res.status(404).send({message: 'No se ha encontrado el cliente a borrar'});
    cliente.remove(err=>{
      if(err) res.status(500).send({message: 'No se ha podido borrar el cliente'});
      res.status(200).send({message: 'Se ha borrado el cliete con exito'});
    });
  });
}

function updateClient(req, res) {
  let clienteId = req.params.id;
  let update = req.body;

  Cliente.findByIdAndUpdate(clienteId, update, function(err, clienteUpdated){
    if(err) res.status(500).send({message: 'No se ha podido actualizar el cliente'});
    if(!clienteUpdated) res.statud(404).send({message: 'No hay cliente por actualizar'});
    res.status(200).send({cliente: clienteUpdated});
  });
}

function getClient(req, res) {
  let clienteId = req.params.id;

  Cliente.findById(clienteId, function(err, cliente){
    if(err) res.status(500).send({message: 'No se ha podido obtener el cliente'});
    if(!cliente) res.status(404).send({message: 'No existe el provedor'});
    res.status(200).send({cliente});
  });
}

function getClients(req, res) {
  Cliente.find({}).exec ((err, clientes)=>{
    if(err) res.status(500).send({messsage: 'Error al obtener los clientes'});
    if(!clientes) res.status(404).send({message: 'No hay clientes'});
    res.status(200).send({clientes});
  })
}
module.exports = {
  saveClient,
  deleteClient,
  updateClient,
  getClient,
  getClients
}


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const express = __webpack_require__(1);
const api = express.Router();
const remesaController = __webpack_require__(25);
const auth = __webpack_require__(3)

//Aqui van las rutas
api.post('/remesa', auth.ensureAuth, remesaController.saveRemesa);
api.put('/remesa/:id', auth.ensureAuth, remesaController.updateRemesa);
api.delete('/remesa/:id', auth.ensureAuth, remesaController.deleteRemesa);
api.get('/remesa/:id', auth.ensureAuth, remesaController.getRemesa);
api.get('/remesas/:idCliente?', auth.ensureAuth, remesaController.getRemesas);
api.get('/remesashoy', auth.ensureAuth, remesaController.getCobrosHoy);

module.exports = api;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

const Remesa = __webpack_require__(9);
const Cliente = __webpack_require__(12);
const Entrada = __webpack_require__(10);
const moment = __webpack_require__(2);
moment.locale('es');

function saveRemesa(req, res) {
  let remesa = new Remesa();
  let params = req.body;
  remesa.nombreProducto = params.nombreproducto;
  remesa.tipoEmpaquetado = params.tipoempaquetado;
  remesa.cantidadEmpaques = params.cantidadempaques;
  remesa.peso = params.peso;
  remesa.tarifa = params.tarifa;
  remesa.estancia = params.estancia;
  remesa.fechaEntrada =  moment().format('MMMM Do YYYY');
  remesa.proximaFechaCobro = moment().add(1, 'month').format('MMMM Do YYYY');
  remesa.pesoPromedio = Math.floor(params.peso/params.cantidadempaques);
  remesa.cliente = params.cliente;

  remesa.save((err, remesaStored)=>{
    if(err) return res.status(500).send({message: 'Error con el servidor al guardar la remesa'});
    if(!remesaStored) return res.status(404).send({message: 'No hay remesa por guardar'});

    let entrada = new Entrada();
    entrada.remesa = remesaStored._id;
    entrada.user = req.user.sub;
    //entrada.fechaIngreso = moment().format('l');
    entrada.fechaIngreso = moment().format('MMMM Do YYYY, h:mm a');

    entrada.save((err, entradaStored)=>{
      if(err) return res.status(500).send({message: 'Error con el servidor al guardar la entrada de remesa'});
      if(!entradaStored) return res.status(404).send({message: 'No hay entrada por guardar'});
      return res.status(200).send({remesa: remesaStored});
    })
  });
}

function deleteRemesa(req, res) {
  let idRemesa = req.params.id;

  Remesa.findByIdAndRemove(idRemesa, (err, remesaRemoved)=>{
    if(err) res.status(500).send({message: 'Error con el servidor al guardar la remesa'});
    if(!remesaRemoved) res.status(404).send({message: 'No hay remesa por mover'});
    res.status(200).send({message: 'Se ha eliminado la remesa con exito', remesaRemoved});
  });
}

function updateRemesa(req, res) {
  let remesaId = req.params.id;
  let update = req.body;

  Remesa.findByIdAndUpdate(remesaId, update, (err, remesaUpdated)=>{
    if(err) res.status(500).send({message: 'Error al actualizar la remesa'});
    if(!remesaUpdated) res.status(404).send({message: 'No hay remesa por guardar'});
    res.status(200).send({remesaUpdated});
  });
}

function getRemesa(req, res) {
  let idCliente = req.params.id;

  Remesa.findById(idCliente, (err, remesa)=>{
    if(err){
      res.status(500).send({message: 'Error al obtener la remesa'});
    }else{
      if(!remesa){
        res.status(404).send({message: 'No existe la remesa'});
      }else{
        Remesa.populate(remesa, {path: 'cliente'}, (err, remesa)=>{
          if(err){
            res.status(500).send({message: 'Error en la peticion'});
          }else{
            res.status(200).send({remesa});
          }
        });
      }
    }
  });
}

const getRemesas = (req, res) => {
  let idCliente = req.params.idCliente;

  if(!idCliente){
    var find = Remesa.find({status: 'STATUS_ACTIVO'}).sort('-fechaEntrada');
  }else{
    var find = Remesa.find({cliente: idCliente, status: 'STATUS_ACTIVO'}).sort('-fechaEntrada');
  }
  find.exec((err, remesas)=>{
    if(err){
      res.status(500).send({message: 'Error con el servidor al obtener las remesas'});
    }else{
      if(!remesas){
        res.status(404).send({message: 'Este cliente no tiene remesas'});
      }else{
        Remesa.populate(remesas, {path: 'cliente'}, (err, remesas)=>{
          if(err){
            res.status(500).send({message: 'Error en la peticion'});
          }else{
            res.status(200).send({remesas});
          }
        });
      }
    }
  });
}

const getCobrosHoy = (req, res) => {
  Remesa.find({proximaFechaCobro: moment().format('MMMM Do YYYY')}, (err, remesas)=>{
    if(err) return res.status(500).send({message: 'No se han podido obtener las remesas de hoy'});
    if(!remesas) return res.status(404).send({message: 'No se han podido obtener las remesas de hoy'});
    return res.status(200).send({remesas});
  });
}

module.exports = {
  saveRemesa,
  deleteRemesa,
  updateRemesa,
  getRemesa,
  getRemesas,
  getCobrosHoy
}


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const express = __webpack_require__(1);
const api = express.Router();
const userController = __webpack_require__(27);
const auth = __webpack_require__(3)

//Estas rutas solo las ve el administrador
api.get('/users', userController.getUsers);
api.get('/user/:id', userController.getUser);
api.post('/user', userController.saveUser);
api.delete('/user/:id', userController.deleteUser);
api.put('/user/:id', userController.updateUser);

api.post('/login', userController.login)

module.exports = api;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const User = __webpack_require__(7);
const gravatar = __webpack_require__(5);
const bcrypt = __webpack_require__(4);
const jwt = __webpack_require__(28)

function saveUser(req, res) {
  let user = new User();
  let params = req.body;
  if(params.name && params.username && params.email){
    user.name = params.name;
    user.username = params.username;
    user.email = params.email;
    user.avatar = gravatar.url(params.email, {s: '100', r: 'x', d: 'retro'}, true);
    user.pin =  Math.floor(Math.random()*(9999 - 1001) + 1000);
    user.role = !params.role ? 'ADMIN': params.role;
    User.findOne({email:  user.email.toLowerCase()}, (err, issetUser)=>{
      if(err){
        res.status(500).send({message: 'Error al comprobar el usuario'})
      }else{
        if(!issetUser){
          bcrypt.hash(params.password, null, null, (err, hash)=>{
            user.password = hash
            user.save((err, userSaved)=>{
              if(err){console.log(err);return res.status(500).send({message: 'Error con el servidor al guardar al usuario'});}
              if(!userSaved) return res.status(404).send({message: 'No hay usuario por guardar'});
              return res.status(200).send({usuario: userSaved});
            });
          })
        }else{
          res.status(200).send({message: 'El correo ya esta en uso'})
        }
      }
    })
  }else{
    res.status(200).send({message: 'Faltan datos para poder guardar el usuario'})
  }
}

function getUser(req, res) {
  let userId = req.params.id;

  User.findById(userId, function(err, user){
    if(err) res.status(500).send({message: 'No se ha podido obtener el usuario'});
    if(!user) res.status(404).send({message: 'No existe el usuario'});
    res.status(200).send({user});
  });
}

function getUsers(req, res) {
  User.find({}).exec ((err, users)=>{
    if(err) res.status(500).send({messsage: 'Error al obtener los usuarios'});
    if(!users) res.status(404).send({message: 'No hay usuarios'});
    res.status(200).send({users});
  })
}

function deleteUser(req, res) {
  let userId = req.params.id;

  User.findByIdAndRemove(userId, (err, userDeleted)=>{
    if(err) res.status(500).send({message: 'Error con el servidor al eliminar al usuario'});
    if(!userDeleted) res.status(404).send({message: 'No hay usuario por eliminar'});
    res.status(200).send({message: 'Se ha eliminado el usuario con exito', userDeleted});
  });
}

function updateUser(req, res) {
  let userId = req.params.id;
  let update = req.body;

  User.findByIdAndUpdate(userId, update, (err, userUpdated)=>{
    if(err) res.status(500).send({message: 'Error al actualizar el usuario'});
    if(!userUpdated) res.status(404).send({message: 'No hay usuario por actualizar'});
    res.status(200).send({userUpdated});
  });
}

const login = (req, res)=>{
  let params = req.body
  let pin = params.pin
  User.findOne({pin: pin}, (err, user)=>{
    if(err){
      res.status(500).send({message: 'Error al buscar el usuario'})
    }else{
      if(user){
        res.status(200).send({token: jwt.createToken(user)})
      }else{
        res.status(404).send({message: 'Usuario no encontrado'})
      }
    }
  })
}

module.exports = {
  saveUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  login
}


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

const jwt = __webpack_require__(11);
const moment = __webpack_require__(2);
const config = __webpack_require__(13);

const clave = 'clavedetokenasibiensecretaquenadiesabe'

exports.createToken = function(user) {
  let payload ={
    sub: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    pin: user.pin,
    iat: moment().unix(),
    exp: moment().add(15, 'days').unix()
  }
  return jwt.encode(payload, clave)
}


/***/ })
/******/ ]);