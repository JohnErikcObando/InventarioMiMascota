const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { ValidationError, UniqueConstraintError } = require('sequelize');

const { Sequelize } = require('sequelize');

class CategoriaService {
  constructor() {}

  async create(data) {
    try {
      const newCategoria = await models.Categoria.create(data);
      return newCategoria;
    } catch (error) {
      if (error instanceof ValidationError) {
        throw boom.badRequest(error.message);
      } else if (error instanceof UniqueConstraintError) {
        throw boom.conflict('Duplicate entry');
      } else {
        throw boom.internal('Internal Server Error');
      }
    }
  }

  async find() {
    const categorias = await models.Categoria.findAll({
      order: [
        ['nombre', 'ASC'], // Orden ascendente por el campo 'nombre'
      ],
    });
    return categorias;
  }

  async findOne(id) {
    const categoria = await models.Categoria.findByPk(id);
    if (!categoria) {
      throw boom.notFound('Categoria not found');
    }
    return categoria;
  }

  async findByName(nombre) {
    const categoria = await models.Categoria.findAll({
      where: {
        nombre: {
          [Sequelize.Op.iLike]: nombre,
        },
      },
    });

    if (!categoria || categoria.length === 0) {
      throw boom.notFound('Categoria not found');
    }

    return categoria;
  }

  async update(id, changes) {
    try {
      const categoria = await this.findOne(id);
      const updatedCategoria = await categoria.update(changes);
      return updatedCategoria;
    } catch (error) {
      if (error instanceof ValidationError) {
        throw boom.badRequest(error.message);
      } else if (error instanceof UniqueConstraintError) {
        throw boom.conflict('Duplicate entry');
      } else {
        throw boom.internal('Internal Server Error');
      }
    }
  }

  async delete(id) {
    const categoria = await this.findOne(id);
    await categoria.destroy();
    return { id };
  }




}

module.exports = CategoriaService;
