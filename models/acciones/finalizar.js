'use strict';

const mongoose = require('mongoose');

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
