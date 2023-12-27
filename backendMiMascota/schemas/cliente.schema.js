const Joi = require('joi');

const id = Joi.string().required();
const nombre = Joi.string().required();
const apellido = Joi.string().allow('').optional();
const direccion = Joi.string().allow('').optional();
const telefono = Joi.string().allow('').optional();
const celular = Joi.string().allow('').optional();
const email = Joi.string().email().allow('').optional();
const usuarioModif = Joi.string().required();

const CreateClienteSchema = Joi.object({
  id,
  nombre,
  apellido,
  direccion,
  telefono,
  celular,
  email,
  usuarioModif,
});

const UpdateClienteSchema = Joi.object({
  id,
  nombre,
  apellido,
  direccion,
  telefono,
  celular,
  email,
  usuarioModif,
});

const GetClienteSchema = Joi.object({
  id,
});

const UpdateClienteModifSchema = Joi.object({
  usuarioModif,
});

module.exports = {
  CreateClienteSchema,
  UpdateClienteSchema,
  GetClienteSchema,
  UpdateClienteModifSchema,
};
