const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');
const { Sequelize } = require('sequelize');

class ProductoService {
  constructor() {}

  async create(data) {
    const nuevoProducto = await models.Producto.create(data);
    return nuevoProducto;
  }

  async find() {
    const productos = await models.Producto.findAll({
      include: [
        { model: models.Marca, as: 'marca' },
        { model: models.Categoria, as: 'categoria' },
      ],
      order: [
        ['nombre', 'ASC'], // Orden ascendente por el campo 'nombre'
      ],
    });
    return productos;
  }

  async findOne(id) {
    const producto = await models.Producto.findByPk(id, {
      include: [
        { model: models.Marca, as: 'marca' },
        { model: models.Categoria, as: 'categoria' },
      ],
    });
    if (!producto) {
      throw boom.notFound('Producto not found');
    }
    return producto;
  }

  async findByName(nombre) {
    const productos = await models.Producto.findAll({
      where: {
        nombre: {
          [Sequelize.Op.iLike]: nombre,
        },
      },
    });

    if (!productos || productos.length === 0) {
      throw boom.notFound('Marca not found');
    }

    return productos;
  }

  async update(id, changes) {
    const producto = await this.findOne(id);
    const productoActualizado = await producto.update(changes);
    return productoActualizado;
  }

  async delete(id) {
    const producto = await this.findOne(id);
    await producto.destroy();
    return { id };
  }
}

module.exports = ProductoService;
