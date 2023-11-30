const Joi = require('joi');

const id = Joi.number().integer();
const nombre = Joi.string().required();
const descripcion = Joi.string().allow('').optional();
const usuarioModif = Joi.string().required();

const CreateCategoriaSchema = Joi.object({
  nombre,
  descripcion,
  usuarioModif,
});

const UpdateCategoriaSchema = Joi.object({
  nombre: nombre.required(),
  descripcion,
  usuarioModif,
});

const GetCategoriaSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  CreateCategoriaSchema,
  UpdateCategoriaSchema,
  GetCategoriaSchema,
};
