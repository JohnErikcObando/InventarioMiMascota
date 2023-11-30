const Joi = require('joi');

const id = Joi.number().integer().required();
const facturaVentaId = Joi.string().required();
const formaPagoId = Joi.number().integer().required();
const fecha = Joi.date().required();
const valor = Joi.number().required();
const descripcion = Joi.string().allow('').optional();
const anulado = Joi.boolean().required();
const usuarioModif = Joi.string().required();

const CreateAbonoFacturaVentaSchema = Joi.object({
  facturaVentaId,
  formaPagoId,
  fecha,
  valor,
  descripcion,
  anulado,
  usuarioModif,
});

const UpdateAbonoFacturaVentaSchema = Joi.object({
  facturaVentaId,
  formaPagoId,
  fecha,
  valor,
  descripcion,
  anulado,
  usuarioModif,
});

const GetAbonoFacturaVentaSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  CreateAbonoFacturaVentaSchema,
  UpdateAbonoFacturaVentaSchema,
  GetAbonoFacturaVentaSchema,
};
