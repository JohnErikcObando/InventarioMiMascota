const Joi = require('joi');

const id = Joi.string().required();
const nombre = Joi.string().required();
const telefono = Joi.string().allow('').optional();
const celular = Joi.string().allow('').optional();
const direccion = Joi.string().allow('').optional();
const email = Joi.string().email().allow('').optional();
const activo = Joi.boolean().required();
const usuarioModif = Joi.string().required();

const CreateProveedorSchema = Joi.object({
  id,
  nombre,
  telefono,
  celular,
  direccion,
  email,
  activo,
  usuarioModif,
});

const UpdateProveedorSchema = Joi.object({
  nombre,
  telefono,
  celular,
  direccion,
  email,
  activo,
  usuarioModif,
});

const GetProveedorSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  CreateProveedorSchema,
  UpdateProveedorSchema,
  GetProveedorSchema,
};
