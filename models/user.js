const mongoose = require('mongoose')
const findOrCreate = require('mongoose-find-or-create')
const Schema = mongoose.Schema;

const UserSchema = Schema({
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
    type: String
  }
});

UserSchema.plugin(findOrCreate)

module.exports = mongoose.model('User', UserSchema);
