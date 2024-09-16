const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');
const { Sequelize } = require('sequelize');

class MarcaService {
  constructor() {}

  async create(data) {
    const nuevaMarca = await models.Marca.create(data);
    return nuevaMarca;
  }

  async find() {
    const marcas = await models.Marca.findAll({
      order: [
        ['nombre', 'ASC'], // Orden ascendente por el campo 'nombre'
      ],
    });
    return marcas;
  }

  async findOne(id) {
    const marca = await models.Marca.findByPk(id);
    if (!marca) {
      throw boom.notFound('Marca not found');
    }
    return marca;
  }

  async findByName(nombre) {
    const marcas = await models.Marca.findAll({
      where: {
        nombre: {
          [Sequelize.Op.iLike]: nombre,
        },
      },
    });

    if (!marcas || marcas.length === 0) {
      throw boom.notFound('Marca not found');
    }

    return marcas;
  }

  async update(id, changes) {
    const marca = await this.findOne(id);
    const marcaActualizada = await marca.update(changes);
    return marcaActualizada;
  }

  async delete(id) {
    const marca = await this.findOne(id);
    await marca.destroy();
    return { id };
  }
}

module.exports = MarcaService;
