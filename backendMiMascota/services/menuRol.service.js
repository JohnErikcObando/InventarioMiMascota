const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class MenuRolService {
  constructor() {}

  async create(data) {
    const nuevoMenuRol = await models.MenuRol.create(data);
    return nuevoMenuRol;
  }

  async find() {
    const menuRols = await models.MenuRol.findAll();
    return menuRols;
  }

  async findOne(id) {
    const menuRol = await models.MenuRol.findByPk(id, {
      include: [
        { model: models.Menu, as: 'menu' },
        { model: models.RolUsuario, as: 'rol_usuario' },
      ],
    });
    if (!menuRol) {
      throw boom.notFound('MenuRol not found');
    }
    return menuRol;
  }

  async update(id, changes) {
    const menuRol = await this.findOne(id);
    const menuRolActualizado = await menuRol.update(changes);
    return menuRolActualizado;
  }

  async delete(id) {
    const menuRol = await this.findOne(id);
    await menuRol.destroy();
    return { id };
  }
}

module.exports = MenuRolService;
