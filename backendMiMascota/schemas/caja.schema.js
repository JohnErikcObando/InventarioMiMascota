const Joi = require('joi');

const id = Joi.number().integer().required();
const nombre = Joi.string().required();
const numFactura = Joi.number().integer().required();
const prefijo = Joi.string().required();
const tipoFactura = Joi.string().required();
const usuarioModif = Joi.string().required();

const CreateCajaSchema = Joi.object({
  nombre,
  numFactura,
  prefijo,
  tipoFactura,
  usuarioModif,
});

const UpdateCajaSchema = Joi.object({
  nombre,
  numFactura,
  prefijo,
  tipoFactura,
  usuarioModif,
});

const GetCajaSchema = Joi.object({
  id,
});

module.exports = { CreateCajaSchema, UpdateCajaSchema, GetCajaSchema };
