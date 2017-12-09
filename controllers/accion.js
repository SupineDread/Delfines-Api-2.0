'use strict';

const moment = require('moment');
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
      retiro.fechaRetiro =  moment().format('MMMM Do YYYY, h:mm a');

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

      let estancia = new accionCambioEstancia();
      estancia.remesa = remesaUpdated._id;
      estancia.user = req.body.user;
      estancia.nuevaestancia = nuevaEstancia;
      estancia.fechaCambio = moment().format('MMMM Do YYYY, h:mm a');

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

  Remesa.findById(remesaId, (err, remesa)=>{
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
      tarifa.fechaCambio = moment().format('MMMM Do YYYY, h:mm a');

      tarifa.save((err, tarifaSaved)=>{
        if(err) res.status(500).send({message: 'Error con el servidor al guardar el cambio de tarifa'});
        if(!tarifaSaved) res.status(404).send({message: 'No hay cambio de tarifa por guardar'});
        res.status(200).send({remesaUpdated});
      });
    });
  });
}

function remesaFinalizar(req, res) {
  let remesaId = req.params.id;

  Remesa.findById(remesaId, (err, remesa)=>{
    if (err) return res.status(500).send({message: 'Error al obtener la remesa'});
    if (!remesa) return res.status(404).send({message: 'No hay remesa por actualizar'});

    Remesa.findByIdAndUpdate(remesaId, {status: 'STATUS_INACTIVO'}, (err, remesaUpdated)=>{
      if(err) res.status(500).send({message: 'Error al actualizar la remesa'});
      if(!remesaUpdated) res.status(404).send({message: 'No hay remesa por guardar'});

      let finalizar = new accionFinalizar();
      finalizar.remesa = remesaUpdated._id;
      finalizar.user = req.body.user;
      finalizar.fechaFinalizar = moment().format('MMMM Do YYYY, h:mm a');

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

  accionEntrada.find({remesa: remesaId}).populate({path:'user'}).populate({path: 'remesa'}).exec ((err, entradas)=>{
    if(err) res.status(500).send({messsage: 'Error al obtener las entradas'});
    if(!entradas) res.status(404).send({message: 'No hay entradas'});
    /*Remesa.populate(entradas, {path: 'remesa'}, (err, entradas)=>{

    });*/

    accionFinalizar.find({remesa: remesaId}).populate({path:'user'}).populate({path: 'remesa'}).exec ((err, finalizadas)=>{
      if(err) res.status(500).send({messsage: 'Error al obtener las acciones de finalizar'});
      if(!finalizadas) res.status(404).send({message: 'No hay acciones de finalizar'});

      accionCambioEstancia.find({remesa:remesaId}).populate({path: 'user'}).populate({path: 'remesa'}).exec ((err, cambioestancia)=>{
        if(err) res.status(500).send({messsage: 'Error al obtener las acciones de cambio de estancia'});
        if(!cambioestancia) res.status(404).send({message: 'No hay acciones de cambio de estancia'});

        accionCambioTarifa.find({remesa: remesaId}).populate({path: 'user'}).populate({path: 'remesa'}).exec ((err, cambiotarifas)=>{
          if(err) res.status(500).send({messsage: 'Error al obtener las acciones de cambio de tarifa'});
          if(!cambiotarifas) res.status(404).send({message: 'No hay acciones de cambio de tarifa'});

          accionRetiro.find({remesa: remesaId}).populate({path: 'user'}).populate({path: 'remesa'}).exec ((err, accionretiros)=>{
            if(err) res.status(500).send({messsage: 'Error al obtener las acciones de retiro'});
            if(!accionretiros) res.status(404).send({message: 'No hay acciones de retiro'});

            res.status(200).send({entradas, accionretiros, cambiotarifas, cambioestancia, finalizadas});
          });
        });
      });
    });
  });
}

module.exports = {
  remesaRetiro,
  remesaCambioEstancia,
  remesaCambioTarifa,
  remesaFinalizar,
  getAcciones
}
