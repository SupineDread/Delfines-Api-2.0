'use strict';

const mongoose = require('mongoose');
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
