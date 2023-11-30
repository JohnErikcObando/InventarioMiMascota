const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class ImpuestoService {
  constructor() {}

  async create(data) {
    const nuevaImpuesto = await models.Impuesto.create(data);
    return nuevaImpuesto;
  }

  async find() {
    const facturasCompra = await models.Impuesto.findAll();
    return facturasCompra;
  }

  async findOne(id) {
    const Impuesto = await models.Impuesto.findByPk(id);
    if (!Impuesto) {
      throw boom.notFound('Impuesto not found');
    }
    return Impuesto;
  }

  async update(id, changes) {
    const Impuesto = await this.findOne(id);
    const ImpuestoActualizada = await Impuesto.update(changes);
    return ImpuestoActualizada;
  }

  async delete(id) {
    const Impuesto = await this.findOne(id);
    await Impuesto.destroy();
    return { id };
  }
}

module.exports = ImpuestoService;
