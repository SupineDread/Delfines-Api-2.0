const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');

exports.createToken = function(user) {
  let payload ={
    sub: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    pin: user.pin,
    iat: moment().unix(),
    exp: moment().add(15, 'days').unix()
  }
  return jwt.encode(payload, config.SECRET_TOKEN)
}
