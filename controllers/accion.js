'use strict';

const Remesa = require('../models/remesa');
const accionRetiro = require('../models/acciones/retiro');
const accionCambioTarifa = require('../models/acciones/cambiotarifa');
const accionCambioEstancia = require('../models/acciones/cambioestancia');
const accionFinalizar = require('../models/acciones/finalizar');

function remesaRetiro(req, res) {
  let remesaId = req.params.id;
  let cantidadretirada = req.body.cantidadretirada;

  Remesa.findById(remesaId, (err, remesa)=>{
    if (err) return res.status(500).send({message: 'Error al obtener la remesa'});
    if (!remesa) return res.status(404).send({message: 'No hay remesa'});

    Remesa.findByIdAndUpdate(remesaId, {cantidadEmpaques: remesa.cantidadEmpaques-cantidadretirada}, (err, remesaUpdated)=>{
      if(err) res.status(500).send({message: 'Error al actualizar la remesa'});
      if(!remesaUpdated) res.status(404).send({message: 'No hay remesa por guardar'});
      res.status(200).send({remesaUpdated});

      let retiro =  new accionRetiro();
      retiro.remesa = remesaUpdated._id;
      retiro.user = req.body.user;
      retiro.cantidadretirada = cantidadretirada;

      retiro.save((err, retiroSaved)=>{
        if(err) res.status(500).send({message: 'Error con el servidor al guardar la entrada de remesa'});
        if(!retiroSaved) res.status(404).send({message: 'No hay entrada por guardar'});
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
      res.status(200).send({remesaUpdated});

      let estancia = new accionCambioEstancia();
      estancia.remesa = remesaUpdated._id;
      estancia.user = req.body.user;
      estancia.nuevaestancia = nuevaEstancia;

      estancia.save((err, estanciaSaved)=>{
        if(err) res.status(500).send({message: 'Error con el servidor al guardar la entrada de remesa'});
        if(!estanciaSaved) res.status(404).send({message: 'No hay entrada por guardar'});
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

    Remesa.findByIdAndUpdate(remesaId, {}, (err, remesaUpdated)=>{
      if(err) res.status(500).send({message: 'Error al actualizar la remesa'});
      if(!remesaUpdated) res.status(404).send({message: 'No hay remesa por guardar'});
      res.status(200).send({remesaUpdated});

      let tarifa = new accionCambioTarifa();
      tarifa.remesa = remesaUpdated._id;
      tarifa.user = req.body.user;
      tarifa.nuevatarifa = nuevaTarifa;

      tarifa.save((err, tarifaSaved)=>{
        if(err) res.status(500).send({message: 'Error con el servidor al guardar la entrada de remesa'});
        if(!tarifaSaved) res.status(404).send({message: 'No hay entrada por guardar'});
      });
    });
  });
}

function remesaFinalizar(req, res) {

}

module.exports = {
  remesaRetiro,
  remesaCambioEstancia,
  remesaCambioTarifa,
  remesaFinalizar
}
