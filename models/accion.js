'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var AccionSchema = Schema({
  remesa: {
    type: Schema.ObjectId,
    ref: 'Remesa'
  },
  tipoAccion: {
    type: String,
    enum: ['entrada', 'salida', 'pago', 'retiro', 'cambioTarifa', 'cambioEstancia', 'finalizar']
  },
  //Este id viene del token???
  muchacho:{
    type: Schema.ObjectId,
    ref: 'User'
  }
});
