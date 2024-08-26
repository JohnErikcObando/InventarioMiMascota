const Joi = require('joi');

const id = Joi.number().integer().required();
const marcaId = Joi.number().integer().required();
const categoriaId = Joi.number().integer().required();
const nombre = Joi.string().required();
const codigo = Joi.string().allow('').optional();
const descripcion = Joi.string().allow('').optional();
const valor = Joi.number().integer().required();
const costo = Joi.number().integer().required();
const imagenUrl = Joi.string().allow('').optional();
const usuarioModif = Joi.string().required();

const CreateProductoSchema = Joi.object({
  marcaId,
  categoriaId,
  nombre,
  codigo,
  descripcion,
  valor,
  costo,
  imagenUrl,
  usuarioModif,
});

const UpdateProductoSchema = Joi.object({
  marcaId,
  categoriaId,
  nombre,
  codigo,
  descripcion,
  valor,
  costo,
  imagenUrl,
  usuarioModif,
});

const GetProductoSchema = Joi.object({
  id: id.required(),
});

const UpdateProductoModifSchema = Joi.object({
  usuarioModif,
});

module.exports = {
  CreateProductoSchema,
  UpdateProductoSchema,
  GetProductoSchema,
  UpdateProductoModifSchema,
};
