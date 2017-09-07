'use strict';

const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');
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

/*UserSchema.pre('save', (next)=>{
  let user = this;
    bcrypt.genSalt(10, (err, salt)=>{
      if(err){
        return next(err)
      }else{
        bcrypt.hash(user.password, salt, null, (err, hash)=>{
          if(err){
            return next(err)
          }else{
            user.password = hash;
            next()
          }
        })
      }
    })
});*/

module.exports = mongoose.model('User', UserSchema);
