const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');
const CajaService = require('./caja.service');
const ProveedorService = require('./proveedor.service');

class FacturaCompraService {
  constructor() {
    this.cajaService = new CajaService();
    this.proveedorService = new ProveedorService();
  }

  async create(data) {
    const proveedorFactura = data.proveedorFactura || {};

    //Verificacion si el cliente existe
    let proveedorExistente = null;
    try {
      if (proveedorFactura.id) {
        proveedorExistente = await this.proveedorService.findOne(
          proveedorFactura.id,
        );
      }
    } catch (error) {
      // El cliente no se encontró, y se capturó la excepción
      proveedorExistente = null;
    }

    if (!proveedorExistente) {
      // Si el cliente no existe, crea uno nuevo
      proveedorExistente = await this.proveedorService.create(proveedorFactura);
    }

    // Verificar la caja que tiene asignada la factura
    try {
      const cajaId = data.cajaId;
      // Obtener la caja actual y actualizar el número de factura
      const factura = await this.cajaService.obtenerCajaActual(cajaId);

      // Crear la factura de venta con el ID adecuado
      const nuevaFacturaCompra = await models.FacturaCompra.create({
        ...data,
        id: factura,
        proveedorId: proveedorExistente.id,
      });
      // Asociar los detalles de venta con la factura
      const detalleCompraData = data.detalleCompra || [];
      await Promise.all(
        detalleCompraData.map(async (detalleCompra) => {
          await models.Compra.create({
            ...detalleCompra,
            facturaCompraId: factura,
          });
        }),
      );

      await this.cajaService.actualizarNumeroFactura(cajaId);

      return nuevaFacturaCompra;
    } catch (error) {
      console.error('Error al crear la factura de venta:', error.message);
      throw error;
    }
  }

  async find() {
    const facturasCompra = await models.FacturaCompra.findAll();
    return facturasCompra;
  }

  async findOne(id) {
    const facturaCompra = await models.FacturaCompra.findByPk(id, {
      include: [
        { model: models.Caja, as: 'caja' },
        { model: models.Proveedor, as: 'proveedor' },
        { model: models.FormaPago, as: 'forma_pago' },
        { model: models.Compra, as: 'compra' },
      ],
    });
    if (!facturaCompra) {
      throw boom.notFound('FacturaCompra not found');
    }
    return facturaCompra;
  }

  async update(id, changes) {
    const facturaCompra = await this.findOne(id);
    const facturaCompraActualizada = await facturaCompra.update(changes);
    return facturaCompraActualizada;
  }

  async delete(id) {
    const facturaCompra = await this.findOne(id);
    await facturaCompra.destroy();
    return { id };
  }
}

module.exports = FacturaCompraService;
