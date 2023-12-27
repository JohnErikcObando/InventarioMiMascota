const Joi = require('joi');

const id = Joi.number().integer().required();
const nombre = Joi.string().required();
const porcentaje = Joi.number().required();
const usuarioModif = Joi.string().required();

const CreateImpuestoSchema = Joi.object({
  nombre,
  porcentaje,
  usuarioModif,
});

const UpdateImpuestoSchema = Joi.object({
  nombre,
  porcentaje,
  usuarioModif,
});

const GetImpuestoSchema = Joi.object({
  id: id.required(),
});

const UpdateImpuestoModifSchema = Joi.object({
  usuarioModif,
});

module.exports = {
  CreateImpuestoSchema,
  UpdateImpuestoSchema,
  GetImpuestoSchema,
  UpdateImpuestoModifSchema,
};
