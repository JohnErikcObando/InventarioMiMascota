const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');
const { Op } = require('sequelize');

class MovimientoService {
  constructor() {}

  async create(data) {
    const nuevoMovimiento = await models.Movimiento.create(data);
    return nuevoMovimiento;
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
    console.log(where);

    const movimientos = await models.Movimiento.findAll({
      where,
      order: [
        ['fecha', 'DESC'], // Ordenar por el campo 'ingreso' en orden descendente
      ],
    });
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
