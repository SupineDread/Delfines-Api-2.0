'use strict';

const mongoose = require('mongoose');
const SHA256 = require('crypto-js/SHA256')
const Schema = mongoose.Schema;

var UserSchema = Schema({
  name: String,
  username: String,
  password: String,
  pin: {
    type:String,
    unique: true
  },
  role:{
    type: String,
    enum: ['ADMIN', 'MUCHACHO'],
    default: 'MUCHACHO'
  }
});

UserSchema.pre('save', (next)=>{
  let user = this;
  let hash = SHA256(user.password).toString();
  user.password = hash;
  next();
});

module.exports = mongoose.model('User', UserSchema);
