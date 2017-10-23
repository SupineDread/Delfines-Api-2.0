'use strict';

const mongoose = require('mongoose');

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
