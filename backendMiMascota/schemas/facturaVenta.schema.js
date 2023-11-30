const Joi = require('joi');

const { CreateClienteSchema } = require('./../schemas/cliente.schema'); // Importar desde el archivo de clientes
const { CreateVentaSchema } = require('./../schemas/venta.schema'); // Importar desde el archivo de ventas

const id = Joi.string();
const clienteId = Joi.string();
const cajaId = Joi.number().integer().required();
const formaPagoId = Joi.number().integer().required();
const fecha = Joi.date().iso().required();
const valor = Joi.number().required();
const descuento = Joi.number().required();
const subtotal = Joi.number().required();
const total = Joi.number().required();
const abono = Joi.number().required();
const saldo = Joi.number().required();
const anulado = Joi.boolean().required();
const descripcion = Joi.string().allow('').optional();
const usuarioModif = Joi.string().required();
const clienteFacturaSchema = CreateClienteSchema; // Reutilizar el esquema de cliente
const detalleVentaSchema = CreateVentaSchema; // Reutilizar el esquema de venta

const CreateFacturaVentaSchema = Joi.object({
  clienteId,
  cajaId,
  formaPagoId,
  fecha,
  valor,
  descuento,
  subtotal,
  total,
  abono,
  saldo,
  anulado,
  descripcion,
  usuarioModif,
  clienteFactura: clienteFacturaSchema,
  detalleVenta: Joi.array().items(detalleVentaSchema),
});

const UpdateFacturaVentaSchema = Joi.object({
  clienteId,
  cajaId,
  formaPagoId,
  fecha,
  valor,
  descuento,
  subtotal,
  total,
  abono,
  saldo,
  anulado,
  descripcion,
  usuarioModif,
});

const GetFacturaVentaSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  CreateFacturaVentaSchema,
  UpdateFacturaVentaSchema,
  GetFacturaVentaSchema,
};
