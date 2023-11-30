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
      include: [
        { model: models.FacturaVenta, as: 'factura_venta' },
        { model: models.Producto, as: 'producto' },
      ],
    });
    if (!venta) {
      throw boom.notFound('Venta not found');
    }
    return venta;
  }

  async update(id, changes) {
    const venta = await this.findOne(id);
    const ventaActualizada = await venta.update(changes);
    return ventaActualizada;
  }

  async delete(id) {
    const venta = await this.findOne(id);
    await venta.destroy();
    return { id };
  }
}

module.exports = VentaService;
