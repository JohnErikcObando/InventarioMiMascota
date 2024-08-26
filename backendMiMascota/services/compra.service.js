const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class CompraService {
  constructor() {}

  async create(data) {
    const nuevaCompra = await models.Compra.create(data);
    return nuevaCompra;
  }

  async find() {
    const compras = await models.Compra.findAll({
      include: [{ model: models.Producto, as: 'producto' }],
    });
    return compras;
  }

  async findOne(id) {
    const compra = await models.Compra.findByPk(id, {
      include: [
        { model: models.Producto, as: 'producto' },
        { model: models.FacturaCompra, as: 'facturaCompra' },
      ],
    });
    if (!compra) {
      throw boom.notFound('Compra not found');
    }
    return compra;
  }

  async update(id, changes) {
    const compra = await this.findOne(id);
    const compraActualizada = await compra.update(changes);
    return compraActualizada;
  }

  async delete(id) {
    const compra = await this.findOne(id);
    await compra.destroy();
    return { id };
  }
}

module.exports = CompraService;
