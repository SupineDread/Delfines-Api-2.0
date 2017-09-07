'use strict';

const mongoose = require('mongoose');
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
