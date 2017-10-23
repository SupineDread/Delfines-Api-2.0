'use strict';

const mongoose = require('mongoose');

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
