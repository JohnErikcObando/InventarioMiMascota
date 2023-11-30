const Joi = require('joi');

const id = Joi.number().integer().required();
const fecha = Joi.date().iso().required();
const tipo = Joi.string().required();
const descripcion = Joi.string().required();
const valor = Joi.number().required();
const factura = Joi.string().optional();
const fechaNow = Joi.date();
const usuarioModif = Joi.string().required();

const CreateMovimientoSchema = Joi.object({
  fecha,
  tipo,
  descripcion,
  valor,
  fechaNow,
  factura,
  usuarioModif,
});

const UpdateMovimientoSchema = Joi.object({
  fecha,
  tipo,
  descripcion,
  valor,
  fechaNow,
  factura,
  usuarioModif,
});

const GetMovimientoSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  CreateMovimientoSchema,
  UpdateMovimientoSchema,
  GetMovimientoSchema,
};
