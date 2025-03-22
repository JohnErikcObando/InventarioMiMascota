const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');
const CajaService = require('./caja.service');
const ProveedorService = require('./proveedor.service');
const { Op } = require('sequelize');

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

      return nuevaFacturaCompra;
    } catch (error) {
      console.error('Error al crear la factura de venta:', error.message);
      throw error;
    }
  }

  async find(fechaInicio, fechaFin) {
    const where = {};

    // Verificar si se proporcionan fechas para el filtro
    if (fechaInicio && fechaFin) {
      const startDate = new Date(fechaInicio);
      const endDate = new Date(fechaFin);
      endDate.setDate(endDate.getDate() + 1); // Agrega un día a la fecha final

      where.fecha = {
        [Op.gte]: startDate,
        [Op.lt]: endDate,
      };
    }

    const facturasCompra = await models.FacturaCompra.findAll({
      where,
      include: [
        { model: models.Caja, as: 'caja' },
        { model: models.Proveedor, as: 'proveedor' },
        { model: models.FormaPago, as: 'forma_pago' },
        {
          model: models.Compra,
          as: 'compra',
          include: [{ model: models.Producto, as: 'producto' }],
        },
      ],
      order: [['id', 'DESC']],
    });

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
