const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class EmpresaService {
  constructor() {}

  async create(data) {
    const newEmpresa = await models.Empresa.create(data);
    return newEmpresa;
  }

  async find() {
    const empresa = await models.Empresa.findAll();
    return empresa;
  }
  async findOne(id) {
    const empresa = await models.Empresa.findByPk(id);
    if (!empresa) {
      throw boom.notFound('empresa not found');
    }
    return empresa;
  }

  async update(id, changes) {
    const empresa = await this.findOne(id);
    const rta = await empresa.update(changes);
    return rta;
  }

  async delete(id) {
    const empresa = await this.findOne(id);
    await empresa.destroy();
    return { id };
  }
}

module.exports = EmpresaService;
