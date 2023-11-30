const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class ClienteService {
  constructor() {}

  async create(data) {
    const nuevoCliente = await models.Cliente.create(data);
    return nuevoCliente;
  }

  async find() {
    const clientes = await models.Cliente.findAll();
    return clientes;
  }

  async findOne(id) {
    const cliente = await models.Cliente.findByPk(id);
    if (!cliente) {
      throw boom.notFound('Cliente not found');
    }
    return cliente;
  }

  async update(id, changes) {
    const cliente = await this.findOne(id);
    const clienteActualizado = await cliente.update(changes);
    return clienteActualizado;
  }

  async delete(id) {
    const cliente = await this.findOne(id);
    await cliente.destroy();
    return { id };
  }
}

module.exports = ClienteService;
