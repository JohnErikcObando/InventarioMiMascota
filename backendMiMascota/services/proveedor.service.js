const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');
const { Sequelize } = require('sequelize');

class ProveedorService {
  constructor() {}

  async create(data) {
    const nuevoProveedor = await models.Proveedor.create(data);
    return nuevoProveedor;
  }

  async find() {
    const proveedores = await models.Proveedor.findAll({
      order: [
        ['nombre', 'ASC'], // Orden ascendente por el campo 'nombre'
        // Puedes agregar más criterios de ordenación según tus necesidades
      ],
    });
    return proveedores;
  }

  async findOne(id) {
    const proveedor = await models.Proveedor.findByPk(id);
    if (!proveedor) {
      throw boom.notFound('Proveedor not found');
    }
    return proveedor;
  }

  async findById(id) {
    const trimId = id.trim();
    const proveedor = await models.Proveedor.findAll({
      where: {
        id: {
          [Sequelize.Op.iLike]: trimId,
        },
      },
    });

    if (!proveedor || proveedor.length === 0) {
      throw boom.notFound('proveedor Id not found');
    }

    return proveedor;
  }

  async findByName(nombre) {
    const proveedor = await models.Proveedor.findAll({
      where: {
        nombre: {
          [Sequelize.Op.iLike]: nombre,
        },
      },
    });

    if (!proveedor || proveedor.length === 0) {
      throw boom.notFound('proveedor not found');
    }

    return proveedor;
  }

  async update(id, changes) {
    const proveedor = await this.findOne(id);
    const proveedorActualizado = await proveedor.update(changes);
    return proveedorActualizado;
  }

  async delete(id) {
    const proveedor = await this.findOne(id);
    await proveedor.destroy();
    return { id };
  }
}

module.exports = ProveedorService;
