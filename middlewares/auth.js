const jwt = require('jwt-simple')
const moment = require('moment')
const config = ('../config')

const clave = 'clavedetokenasibiensecretaquenadiesabe'

exports.ensureAuth = function(req, res, next){
  if (!req.headers.authorization) {
    return res.status(200).send({message: 'Necesitas estar autenticado para acceder a esta funcion'})
  }

  let token = req.headers.authorization.replace(/['"]+/g, '')

  try{
    let payload = jwt.decode(token, clave)

    req.user =  payload

    if (payload.exp <= moment().unix()) {
      return res.status(401).send({message: 'El token ha expirado'})
    }
  }catch(ex){
    return res.status(404).send({message: 'El token no es valido'})
  }

  next();
}
