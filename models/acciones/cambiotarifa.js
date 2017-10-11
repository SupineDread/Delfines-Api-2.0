'use strict';

const mongoose = require('mongoose');

const TarifaSchema =  mongoose.Schema({
  remesa: {
    type: mongoose.Schema.ObjectId,
    ref: 'Remesa'
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  fechacambio:{
    type: Date,
    default: Date.now
  },
  nuevatarifa: {
    type: Number
  }
});

module.exports = mongoose.model('Tarifa', TarifaSchema);
