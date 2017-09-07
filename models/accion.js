'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var AccionSchema = Schema({
  //Muchas acciones pertenecen a una remesa (muchas imagenes corresponden a un album)
  remesa: {
    type: Schema.ObjectId,
    ref: 'Remesa'
  },
  tipoAccion: {
    type: String,
    enum: ['entrada', 'salida', 'pago', 'retiro', 'cambioTarifa', 'cambioEstancia', 'finalizar']
  },
  //Su relacion con el muchaacho(User con role muchacho) que hizo la accion
  //Muchacho (User con role muchacho)
  muchacho:{
    type: Schema.ObjectId,
    ref: 'User'
  }
});
