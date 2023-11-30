const Joi = require('joi');

const id = Joi.number().integer().required();
const nombre = Joi.string().required();
const usuarioModif = Joi.string().required();

const CreateFormaPagoSchema = Joi.object({
  nombre: nombre.required(),
  usuarioModif,
});

const UpdateFormaPagoSchema = Joi.object({
  nombre: nombre.required(),
  usuarioModif,
});

const GetFormaPagoSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  CreateFormaPagoSchema,
  UpdateFormaPagoSchema,
  GetFormaPagoSchema,
};
