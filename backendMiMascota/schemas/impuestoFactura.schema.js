const Joi = require('joi');

const id = Joi.number().integer();
const facturaVentaId = Joi.string().required();
const impuestoId = Joi.number().integer().required();
const valor = Joi.number().required();
const usuarioModif = Joi.string().required();

const CreateImpuestoFacturaSchema = Joi.object({
  facturaVentaId,
  impuestoId,
  valor,
  usuarioModif,
});

const UpdateImpuestoFacturaSchema = Joi.object({
  facturaVentaId,
  impuestoId,
  valor,
  usuarioModif,
});

const GetImpuestoFacturaSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  CreateImpuestoFacturaSchema,
  UpdateImpuestoFacturaSchema,
  GetImpuestoFacturaSchema,
};
