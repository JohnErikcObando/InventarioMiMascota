const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class MovimientoService {
  constructor() {}

  async create(data) {
    const nuevoMovimiento = await models.Movimiento.create(data);
    return nuevoMovimiento;
  }

  async find() {
    const movimientos = await models.Movimiento.findAll();
    return movimientos;
  }

  async findOne(id) {
    const movimiento = await models.Movimiento.findByPk(id);
    if (!movimiento) {
      throw boom.notFound('Movimiento not found');
    }
    return movimiento;
  }

  async update(id, changes) {
    const movimiento = await this.findOne(id);
    const movimientoActualizado = await movimiento.update(changes);
    return movimientoActualizado;
  }

  async delete(id) {
    const movimiento = await this.findOne(id);
    await movimiento.destroy();
    return { id };
  }
}

module.exports = MovimientoService;
