const SHA256 = require('crypto-js/sha256');
const gravatar = require('gravatar');

module.exports={
  port: process.env.PORT || 8080,
  //db: process.env.MONGODB || 'mongodb://admin:cacr2205@ds036577.mlab.com:36577/congelados-delfines',
  db: process.env.MONGODB || 'mongodb://localhost:27017/delfines',
  SECRET_TOKEN: 'miclavedetokensasibiensecretaybienproquenadiesabe',
  userAdmin: {
    name: 'Administrador',
    username: 'Administrador',
    password: SHA256('cacr2205').toString(),
    avatar: gravatar.url('cacr@mail.com', {s: '100', r: 'x', d: 'retro'}, true),
    email: 'cacr@mail.com',
    pin: 10000,
    role: 'ADMIN'}
}
