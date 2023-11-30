const Joi = require('joi');

const id = Joi.number().integer();
const productoId = Joi.number().integer().required();
const entrada = Joi.number().integer().required();
const salida = Joi.number().integer().required();
const saldo = Joi.number().integer().required();

const CreateInventarioSchema = Joi.object({
  productoId,
  entrada,
  salida,
  saldo,
});

const UpdateInventarioSchema = Joi.object({
  productoId,
  entrada,
  salida,
  saldo,
});

const GetInventarioSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  CreateInventarioSchema,
  UpdateInventarioSchema,
  GetInventarioSchema,
};
