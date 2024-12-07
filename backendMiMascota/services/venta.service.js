const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class VentaService {
  constructor() {}

  async create(data) {
    const nuevaVenta = await models.Venta.create(data);
    return nuevaVenta;
  }

  async find() {
    const ventas = await models.Venta.findAll({
      include: [
        { model: models.FacturaVenta, as: 'factura_venta' },
        { model: models.Producto, as: 'producto' },
      ],
    });
    return ventas;
  }

  async findOne(id) {
    const venta = await models.Venta.findByPk(id, {
      include: [{ model: models.Producto, as: 'producto' }],
    });
    if (!venta) {
      throw boom.notFound('Venta not found');
    }
    return venta;
  }

  async findByVenta(facturaVentaId) {
    const where = {};

    // Verificar si se proporciona facturaVentaId para el filtro
    if (facturaVentaId) {
      where.facturaVentaId = facturaVentaId;
    }

    const ventas = await models.Venta.findAll({
      where, // Aplicar el filtro aquí
      include: [{ model: models.Producto, as: 'producto' }],
    });
    return ventas;
  }
}

module.exports = VentaService;
