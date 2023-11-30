const Joi = require('joi');

const id = Joi.number().integer().required();
const facturaCompraId = Joi.string();
const productoId = Joi.number().integer().required();
const cantidad = Joi.number().integer().required();
const costo = Joi.number().required();
const venta = Joi.number().required();
const total = Joi.number().required();
const usuarioModif = Joi.string().required();

const CreateCompraSchema = Joi.object({
  facturaCompraId,
  productoId,
  cantidad,
  costo,
  venta,
  total,
  usuarioModif,
});

const UpdateCompraSchema = Joi.object({
  facturaCompraId,
  productoId,
  cantidad,
  costo,
  venta,
  total,
  usuarioModif,
});

const GetCompraSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  CreateCompraSchema,
  UpdateCompraSchema,
  GetCompraSchema,
};
