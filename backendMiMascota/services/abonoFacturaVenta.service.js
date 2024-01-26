const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class AbonoFacturaService {
  constructor() {}

  async create(data) {
    const newAbonoFacturaVenta = await models.AbonoFacturaVenta.create(data);
    return newAbonoFacturaVenta;
  }

  async find() {
    const rta = await models.AbonoFacturaVenta.findAll();
    return rta;
  }

  async findOne(id) {
    const AbonoFacturaVenta = await models.AbonoFacturaVenta.findByPk(id);
    if (!AbonoFacturaVenta) {
      throw boom.notFound('AbonoFacturaVenta not found');
    }
    return AbonoFacturaVenta;
  }

  async findByFacturaVentaId(facturaVentaId) {
    const AbonoFacturaVenta = await models.AbonoFacturaVenta.findAll({
      where: { facturaVentaId },
      include: [{ model: models.FormaPago, as: 'forma_pago' }],
    });
    if (!AbonoFacturaVenta) {
      throw boom.notFound('AbonoFacturaVenta not found');
    }
    return AbonoFacturaVenta;
  }

  async update(id, changes) {
    const AbonoFacturaVenta = await this.findOne(id);
    const rta = await AbonoFacturaVenta.update(changes);
    return rta;
  }

  async delete(id) {
    const AbonoFacturaVenta = await this.findOne(id);
    await AbonoFacturaVenta.destroy();
    return { id };
  }
}

module.exports = AbonoFacturaService;
