const Joi = require('joi');

const id = Joi.number().integer();
const facturaVentaId = Joi.string();
const productoId = Joi.number().integer().required();
const cantidad = Joi.number().integer().required();
const valor = Joi.number().required();
const fechaNow = Joi.date();
const usuarioModif = Joi.string().required();

const CreateVentaSchema = Joi.object({
  facturaVentaId,
  productoId,
  cantidad,
  valor,
  fechaNow,
  usuarioModif,
});

const UpdateVentaSchema = Joi.object({
  facturaVentaId,
  productoId,
  cantidad,
  valor,
  fechaNow,
  usuarioModif,
});

const GetVentaSchema = Joi.object({
  id: id.required(),
});

module.exports = { CreateVentaSchema, UpdateVentaSchema, GetVentaSchema };
