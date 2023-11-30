const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class MarcaService {
  constructor() {}

  async create(data) {
    const nuevaMarca = await models.Marca.create(data);
    return nuevaMarca;
  }

  async find() {
    const marcas = await models.Marca.findAll();
    return marcas;
  }

  async findOne(id) {
    const marca = await models.Marca.findByPk(id);
    if (!marca) {
      throw boom.notFound('Marca not found');
    }
    return marca;
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
