const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class InventarioService {
  constructor() {}

  async create(data) {
    const nuevoInventario = await models.Inventario.create(data);
    return nuevoInventario;
  }

  async find() {
    const inventario = await models.Producto.findAll({
      include: [{ model: models.Inventario, as: 'inventario' }],
      order: [
        ['nombre', 'ASC'], // Orden ascendente por el campo 'nombre'
      ],
    });
    return inventario;
  }

  async findOne(id) {
    const inventario = await models.Inventario.findByPk(id, {
      include: [{ model: models.Producto, as: 'producto' }],
    });

    if (!inventario) {
      throw boom.notFound('Inventario not found');
    }

    return inventario;
  }

  async update(id, changes) {
    const inventario = await this.findOne(id);
    const inventarioActualizado = await inventario.update(changes);
    return inventarioActualizado;
  }

  async delete(id) {
    const inventario = await this.findOne(id);
    await inventario.destroy();
    return { id };
  }
}

module.exports = InventarioService;
