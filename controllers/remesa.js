'use strict';

const Remesa = require('../models/remesa');
const Cliente = require('../models/cliente');
const Entrada = require('../models/acciones/entrada');
const moment = require('moment');

function saveRemesa(req, res) {
  let remesa = new Remesa();
  let params = req.body;
  remesa.nombreProducto = params.nombreproducto;
  remesa.tipoEmpaquetado = params.tipoempaquetado;
  remesa.cantidadEmpaques = params.cantidadempaques;
  remesa.peso = params.peso;
  remesa.tarifa = params.tarifa;
  remesa.estancia = params.estancia;
  remesa.cliente = params.cliente;
  remesa.fechaEntrada = moment().format('l');
  remesa.proximaFechaCobro = moment().add(1, 'month').calendar();

  remesa.save((err, remesaStored)=>{
    if(err) res.status(500).send({message: 'Error con el servidor al guardar la remesa'});
    if(!remesaStored) res.status(404).send({message: 'No hay remesa por guardar'});
    res.status(200).send({remesa: remesaStored});

    let entrada = new Entrada();
    entrada.remesa = remesaStored._id;
    entrada.user = params.user;
    entrada.fechaIngreso = moment().format('l');

    entrada.save((err, entradaStored)=>{
      if(err) res.status(500).send({message: 'Error con el servidor al guardar la entrada de remesa'});
      if(!entradaStored) res.status(404).send({message: 'No hay entrada por guardar'});
    })
  });
}

function deleteRemesa(req, res) {
  let idRemesa = req.params.id;

  Remesa.findByIdAndRemove(idRemesa, (err, remesaRemoved)=>{
    if(err) res.status(500).send({message: 'Error con el servidor al guardar la remesa'});
    if(!remesaRemoved) res.status(404).send({message: 'No hay remesa por mover'});
    res.status(200).send({message: 'Se ha eliminado la remesa con exito', remesaRemoved});
  });
}

function updateRemesa(req, res) {
  let remesaId = req.params.id;
  let update = req.body;

  Remesa.findByIdAndUpdate(remesaId, update, (err, remesaUpdated)=>{
    if(err) res.status(500).send({message: 'Error al actualizar la remesa'});
    if(!remesaUpdated) res.status(404).send({message: 'No hay remesa por guardar'});
    res.status(200).send({remesaUpdated});
  });
}

function getRemesa(req, res) {
  let idCliente = req.params.id;

  Remesa.findById(idCliente, (err, remesa)=>{
    if(err){
      res.status(500).send({message: 'Error al obtener la remesa'});
    }else{
      if(!remesa){
        res.status(404).send({message: 'No existe la remesa'});
      }else{
        Remesa.populate(remesa, {path: 'cliente'}, (err, remesa)=>{
          if(err){
            res.status(500).send({message: 'Error en la peticion'});
          }else{
            res.status(200).send({remesa});
          }
        });
      }
    }
  });
}

function getRemesas(req, res) {
  let idCliente = req.params.idCliente;

  if(!idCliente){
    //Obtener todas las remesas
    var find = Remesa.find({}).sort('-nombreProducto');
  }else{
    //Obtener todas las remesas asociados a un provedor
    var find = Remesa.find({cliente: idCliente}).sort('-nombreProducto');
  }
  find.exec((err, remesas)=>{
    if(err){
      res.status(500).send({message: 'Error con el servidor'});
    }else{
      if(!remesas){
        res.status(404).send({message: 'Este cliente no tiene remesas'});
      }else{
        Remesa.populate(remesas, {path: 'cliente'}, (err, remesas)=>{
          if(err){
            res.status(500).send({message: 'Error en la peticion'});
          }else{
            res.status(200).send({remesas});
          }
        });
      }
    }
  });
}

module.exports = {
  saveRemesa,
  deleteRemesa,
  updateRemesa,
  getRemesa,
  getRemesas
}
