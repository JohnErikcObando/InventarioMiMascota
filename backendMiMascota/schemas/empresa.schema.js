const Joi = require('joi');

const id = Joi.string().required();
const nombre = Joi.string().required();
const direccion = Joi.string().allow('').optional();
const telefono = Joi.string().allow('').optional();
const celular = Joi.string().allow('').optional();
const logo = Joi.string().allow('').optional();
const email = Joi.string().allow('').optional().email();
const usuarioModif = Joi.string().required();

const CreateEmpresaSchema = Joi.object({
  id,
  nombre,
  direccion,
  telefono,
  celular,
  logo,
  email,
  usuarioModif,
});

const UpdateEmpresaSchema = Joi.object({
  nombre,
  direccion,
  telefono,
  celular,
  logo,
  email,
  usuarioModif,
});

const GetEmpresaSchema = Joi.object({
  id: id.required(),
});

module.exports = { CreateEmpresaSchema, UpdateEmpresaSchema, GetEmpresaSchema };
