const Joi = require('joi');

const id = Joi.number().integer().required();
const rolUsuarioId = Joi.number().integer().required();
const usuario = Joi.string().required();
const password = Joi.string().required();
const nombre = Joi.string().required();
const apellido = Joi.string().allow('').optional();
const email = Joi.string().email().required();
const activo = Joi.boolean().required();
const fechaNow = Joi.date();
const usuarioModif = Joi.string().required();

const CreateUsuarioSchema = Joi.object({
  rolUsuarioId,
  usuario,
  password,
  nombre,
  apellido,
  email,
  activo,
  fechaNow,
  usuarioModif,
});

const UpdateUsuarioSchema = Joi.object({
  rolUsuarioId,
  usuario,
  password,
  nombre,
  apellido,
  email,
  activo,
  fechaNow,
  usuarioModif,
});

const GetUsuarioSchema = Joi.object({
  id: id.required(),
});

module.exports = { CreateUsuarioSchema, UpdateUsuarioSchema, GetUsuarioSchema };
