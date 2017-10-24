'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = Schema({
  name: String,
  username: String,
  password: {
    type: String
  },
  pin: {
    type:String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  avatar: {
    type: String
  },
  role:{
    type: [String],
    enum: ['ADMIN', 'MUCHACHO'],
    default: 'MUCHACHO'
  }
});
module.exports = mongoose.model('User', UserSchema);
