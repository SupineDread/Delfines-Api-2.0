'use strict';

const Remesa = require('../models/remesa');
const accionRetiro = require('../models/acciones/retiro');
const accionCambioTarifa = require('../models/acciones/cambiotarifa');
const accionCambioEstancia = require('../models/acciones/cambioestancia');
const accionFinalizar = require('../models/acciones/finalizar');
const accionEntrada = require('../models/acciones/entrada');

function remesaRetiro(req, res) {
  let remesaId = req.params.id;
  let cantidadretirada = req.body.cantidadretirada;

  Remesa.findById(remesaId, (err, remesa)=>{
    if (err) return res.status(500).send({message: 'Error al obtener la remesa'});
    if (!remesa) return res.status(404).send({message: 'No hay remesa'});

    Remesa.findByIdAndUpdate(remesaId, {cantidadEmpaques: remesa.cantidadEmpaques-cantidadretirada}, (err, remesaUpdated)=>{
      if(err) res.status(500).send({message: 'Error al actualizar la remesa'});
      if(!remesaUpdated) res.status(404).send({message: 'No hay remesa por guardar'});
      //res.status(200).send({remesaUpdated});

      let retiro =  new accionRetiro();
      retiro.remesa = remesaUpdated._id;
      retiro.user = req.body.user;
      retiro.cantidadretirada = cantidadretirada;

      retiro.save((err, retiroSaved)=>{
        if(err) res.status(500).send({message: 'Error con el servidor al guardar la entrada de remesa'});
        if(!retiroSaved) res.status(404).send({message: 'No hay entrada por guardar'});
        res.status(200).send({remesaUpdated});
      });
    });
  });
}

function remesaCambioEstancia(req, res) {
  let remesaId = req.params.id;
  let nuevaEstancia = req.body.nuevaestancia;

  Remesa.findById(remesaId, (err, remesa)=>{
    if (err) return res.status(500).send({message: 'Error al obtener la remesa'});
    if (!remesa) return res.status(404).send({message: 'No hay remesa'});

    Remesa.findByIdAndUpdate(remesaId, {estancia: nuevaEstancia}, (err, remesaUpdated)=>{
      if(err) res.status(500).send({message: 'Error al actualizar la remesa'});
      if(!remesaUpdated) res.status(404).send({message: 'No hay remesa por guardar'});
      //res.status(200).send({remesaUpdated});

      let estancia = new accionCambioEstancia();
      estancia.remesa = remesaUpdated._id;
      estancia.user = req.body.user;
      estancia.nuevaestancia = nuevaEstancia;

      estancia.save((err, estanciaSaved)=>{
        if(err) res.status(500).send({message: 'Error con el servidor al guardar la entrada de remesa'});
        if(!estanciaSaved) res.status(404).send({message: 'No hay entrada por guardar'});
        res.status(200).send({remesaUpdated});
      });
    });
  });
}

function remesaCambioTarifa(req, res) {
  let remesaId = req.params.id;
  let nuevaTarifa = req.body.nuevatarifa;

  Remesa.findById(remesaId, (err, remesa)=>{a
    if (err) return res.status(500).send({message: 'Error al obtener la remesa'});
    if (!remesa) return res.status(404).send({message: 'No hay remesa por actualizar'});

    Remesa.findByIdAndUpdate(remesaId, {tarifa: nuevaTarifa}, (err, remesaUpdated)=>{
      if(err) res.status(500).send({message: 'Error al actualizar la remesa'});
      if(!remesaUpdated) res.status(404).send({message: 'No hay remesa por guardar'});
      //res.status(200).send({remesaUpdated});

      let tarifa = new accionCambioTarifa();
      tarifa.remesa = remesaUpdated._id;
      tarifa.user = req.body.user;
      tarifa.nuevatarifa = nuevaTarifa;

      tarifa.save((err, tarifaSaved)=>{
        if(err) res.status(500).send({message: 'Error con el servidor al guardar la entrada de remesa'});
        if(!tarifaSaved) res.status(404).send({message: 'No hay entrada por guardar'});
        res.status(200).send({remesaUpdated});
      });
    });
  });
}

//Con solo hacer el put a esta ruta se cambia el estado de la remesa
function remesaFinalizar(req, res) {
  let remesaId = req.params.id;

  Remesa.findById(remesaId, (err, remesa)=>{
    if (err) return res.status(500).send({message: 'Error al obtener la remesa'});
    if (!remesa) return res.status(404).send({message: 'No hay remesa por actualizar'});

    Remesa.findByIdAndUpdate(remesaId, {status: 'STATUS_INACTIVO'}, (err, remesaUpdated)=>{
      if(err) res.status(500).send({message: 'Error al actualizar la remesa'});
      if(!remesaUpdated) res.status(404).send({message: 'No hay remesa por guardar'});
      //res.status(200).send({remesaUpdated});

      let finalizar = new accionFinalizar();
      finalizar.remesa = remesaUpdated._id;
      finalizar.user = req.body.user;

      finalizar.save((err, finalizarSaved)=>{
        if(err) res.status(500).send({message: 'Error con el servidor al guardar la entrada de remesa'});
        if(!finalizarSaved) res.status(404).send({message: 'No hay finalizar por guardar'});
        res.status(200).send({remesaUpdated});
      });
    })
  });
}

function getAcciones(req, res) {
  let remesaId = req.params.id;

  accionEntrada.find({remesa: remesaId}).exec ((err, entradas)=>{
    if(err) res.status(500).send({messsage: 'Error al obtener los usuarios'});
    if(!entradas) res.status(404).send({message: 'No hay usuarios'});
    res.status(200).send({entradas});
  });
}

module.exports = {
  remesaRetiro,
  remesaCambioEstancia,
  remesaCambioTarifa,
  remesaFinalizar,
  getAcciones
}
