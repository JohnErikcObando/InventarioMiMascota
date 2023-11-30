const Joi = require('joi');

const id = Joi.number().integer().required();
const usuario = Joi.string().required();
const campo = Joi.string().required();
const modulo = Joi.string().required();
const identificador = Joi.string().required();
const fecha = Joi.date().iso().required();
const nuevo = Joi.string().required();
const anterior = Joi.string().required();
const accion = Joi.string().required();

const CreateHistorialSchema = Joi.object({
  usuario,
  campo,
  modulo,
  identificador,
  fecha,
  nuevo,
  anterior,
  accion,
});

const UpdateHistorialSchema = Joi.object({
  usuario,
  campo,
  modulo,
  identificador,
  fecha,
  nuevo,
  anterior,
  accion,
});

const GetHistorialSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  CreateHistorialSchema,
  UpdateHistorialSchema,
  GetHistorialSchema,
};
