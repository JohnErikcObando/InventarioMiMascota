const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class HistorialService {
  constructor() {}

  async create(data) {
    const nuevoHistorial = await models.Historial.create(data);
    return nuevoHistorial;
  }

  async find() {
    const historiales = await models.Historial.findAll();
    return historiales;
  }

  async findOne(id) {
    const historial = await models.Historial.findByPk(id);
    if (!historial) {
      throw boom.notFound('Historial not found');
    }
    return historial;
  }

  async update(id, changes) {
    const historial = await this.findOne(id);
    const historialActualizado = await historial.update(changes);
    return historialActualizado;
  }

  async delete(id) {
    const historial = await this.findOne(id);
    await historial.destroy();
    return { id };
  }
}

module.exports = HistorialService;
