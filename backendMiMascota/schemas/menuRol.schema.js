const Joi = require('joi');

const id = Joi.number().integer().required();
const menuId = Joi.number().integer().required();
const rolUsuarioId = Joi.number().integer().required();
const usuarioModif = Joi.string().required();

const CreateMenuRolSchema = Joi.object({
  menuId,
  rolUsuarioId,
  usuarioModif,
});

const UpdateMenuRolSchema = Joi.object({
  menuId,
  rolUsuarioId,
  usuarioModif,
});

const GetMenuRolSchema = Joi.object({
  id: id.required(),
});

module.exports = { CreateMenuRolSchema, UpdateMenuRolSchema, GetMenuRolSchema };
