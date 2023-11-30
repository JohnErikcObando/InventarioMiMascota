const Joi = require('joi');

const id = Joi.number().integer().required();
const nombre = Joi.string().required();
const icono = Joi.string().allow('').optional();
const url = Joi.string().allow('').optional();
const usuarioModif = Joi.string().required();

const CreateMenuSchema = Joi.object({
  nombre,
  icono,
  url,
  usuarioModif
});

const UpdateMenuSchema = Joi.object({
  nombre,
  icono,
  url,
  usuarioModif
});

const GetMenuSchema = Joi.object({
  id: id.required(),
});

module.exports = { CreateMenuSchema, UpdateMenuSchema, GetMenuSchema };
