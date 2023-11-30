const Joi = require('joi');

const id = Joi.number().integer().required();
const nombre = Joi.string().required();
const fechaNow = Joi.date();
const usuarioModif = Joi.string().required();

const CreateRolUsuarioSchema = Joi.object({
  nombre,
  fechaNow,
  usuarioModif,
});

const UpdateRolUsuarioSchema = Joi.object({
  nombre,
  usuarioModif,
});

const GetRolUsuarioSchema = Joi.object({
  id,
});

module.exports = {
  CreateRolUsuarioSchema,
  UpdateRolUsuarioSchema,
  GetRolUsuarioSchema,
};
