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
  fechaingreso:{
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Entrada', EntradaSchema);
