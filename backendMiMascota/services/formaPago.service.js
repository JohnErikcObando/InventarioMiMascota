const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');
const { Sequelize } = require('sequelize');

class FormaPagoService {
  constructor() {}

  async create(data) {
    const nuevaFormaPago = await models.FormaPago.create(data);
    return nuevaFormaPago;
  }

  async find() {
    const formasPago = await models.FormaPago.findAll({
      order: [
        ['nombre', 'ASC'], // Orden ascendente por el campo 'nombre'
      ],
    });
    return formasPago;
  }

  async findOne(id) {
    const formaPago = await models.FormaPago.findByPk(id);
    if (!formaPago) {
      throw boom.notFound('FormaPago not found');
    }
    return formaPago;
  }

  async findByName(nombre) {
    const formaPago = await models.FormaPago.findAll({
      where: {
        nombre: {
          [Sequelize.Op.iLike]: nombre,
        },
      },
    });

    if (!formaPago || formaPago.length === 0) {
      throw boom.notFound('FormaPago not found');
    }

    return formaPago;
  }

  async update(id, changes) {
    const formaPago = await this.findOne(id);
    const formaPagoActualizada = await formaPago.update(changes);
    return formaPagoActualizada;
  }

  async delete(id) {
    const formaPago = await this.findOne(id);
    await formaPago.destroy();
    return { id };
  }
}

module.exports = FormaPagoService;
