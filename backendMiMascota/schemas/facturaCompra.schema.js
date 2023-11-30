const Joi = require('joi');

const { CreateProveedorSchema } = require('./../schemas/proveedor.schema'); // Importar desde el archivo de clientes
const { CreateCompraSchema } = require('./../schemas/compra.schema'); // Importar desde el archivo de ventas

const id = Joi.string();
const proveedorId = Joi.string();
const cajaId = Joi.number().integer().required();
const formaPagoId = Joi.number().integer().required();
const movimientoId = Joi.number().integer().allow(null).default(null);
const fecha = Joi.date().iso().required();
const valor = Joi.number().required();
const descuento = Joi.number().required();
const subtotal = Joi.number().required();
const total = Joi.number().required();
const abono = Joi.number().required();
const saldo = Joi.number().required();
const anulado = Joi.boolean().required();
const imagenUrl = Joi.string().allow('');
const descripcion = Joi.string().allow('').optional();
const usuarioModif = Joi.string().required();
const ProveedorFacturaSchema = CreateProveedorSchema;
const detalleCompraSchema = CreateCompraSchema;

const CreateFacturaCompraSchema = Joi.object({
  id,
  proveedorId,
  cajaId,
  formaPagoId,
  movimientoId,
  fecha,
  valor,
  descuento,
  subtotal,
  total,
  abono,
  saldo,
  anulado,
  imagenUrl,
  descripcion,
  usuarioModif,
  proveedorFactura: ProveedorFacturaSchema,
  detalleCompra: Joi.array().items(detalleCompraSchema),
});

const UpdateFacturaCompraSchema = Joi.object({
  proveedorId,
  cajaId,
  formaPagoId,
  movimientoId,
  fecha,
  valor,
  descuento,
  subtotal,
  total,
  abono,
  saldo,
  anulado,
  imagenUrl,
  descripcion,
  usuarioModif,
});

const GetFacturaCompraSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  CreateFacturaCompraSchema,
  UpdateFacturaCompraSchema,
  GetFacturaCompraSchema,
};
