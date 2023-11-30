const Joi = require('joi');

const id = Joi.number().integer().required();
const nombre = Joi.string().required();
const descripcion = Joi.string().allow('').optional();
const usuarioModif = Joi.string().required();

const CreateMarcaSchema = Joi.object({
  nombre,
  descripcion,
  usuarioModif,
});

const UpdateMarcaSchema = Joi.object({
  nombre,
  descripcion,
  usuarioModif,
});

const GetMarcaSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  CreateMarcaSchema,
  UpdateMarcaSchema,
  GetMarcaSchema,
};
