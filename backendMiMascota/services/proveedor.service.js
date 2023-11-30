const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class ProveedorService {
  constructor() {}

  async create(data) {
    const nuevoProveedor = await models.Proveedor.create(data);
    return nuevoProveedor;
  }

  async find() {
    const proveedores = await models.Proveedor.findAll();
    return proveedores;
  }

  async findOne(id) {
    const proveedor = await models.Proveedor.findByPk(id);
    if (!proveedor) {
      throw boom.notFound('Proveedor not found');
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
