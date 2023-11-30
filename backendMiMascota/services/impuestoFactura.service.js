const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');
const { FacturaVenta } = require('../db/models/facturaVenta.model');
const { Impuesto } = require('../db/models/impuesto.model');

class ImpuestoFacturaService {
  constructor() {}

  async create(data) {
    const nuevoImpuestoFactura = await models.ImpuestoFactura.create(data);
    return nuevoImpuestoFactura;
  }

  async find() {
    const impuestosFactura = await models.ImpuestoFactura.findAll();
    return impuestosFactura;
  }

  async findOne(id) {
    const impuestoFactura = await models.ImpuestoFactura.findByPk(id, {
      include: [
        { model: FacturaVenta, as: 'factura_venta' },
        { model: Impuesto, as: 'impuesto' },
      ],
    });
    if (!impuestoFactura) {
      throw boom.notFound('ImpuestoFactura not found');
    }
    return impuestoFactura;
  }

  async update(id, changes) {
    const impuestoFactura = await this.findOne(id);
    const impuestoFacturaActualizado = await impuestoFactura.update(changes);
    return impuestoFacturaActualizado;
  }

  async delete(id) {
    const impuestoFactura = await this.findOne(id);
    await impuestoFactura.destroy();
    return { id };
  }
}

module.exports = ImpuestoFacturaService;
