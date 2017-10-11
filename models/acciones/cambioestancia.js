'use strict';

const mongoose = require('mongoose');

const EstanciaSchema =  mongoose.Schema({
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
  nuevaestancia: {
    type: Number
  }
});

module.exports = mongoose.model('Estancia', EstanciaSchema);
