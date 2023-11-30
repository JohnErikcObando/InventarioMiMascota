const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class MenuService {
  constructor() {}

  async create(data) {
    const nuevoMenu = await models.Menu.create(data);
    return nuevoMenu;
  }

  async find() {
    const menus = await models.Menu.findAll();
    return menus;
  }

  async findOne(id) {
    const menu = await models.Menu.findByPk(id);
    if (!menu) {
      throw boom.notFound('Menu not found');
    }
    return menu;
  }

  async update(id, changes) {
    const menu = await this.findOne(id);
    const menuActualizado = await menu.update(changes);
    return menuActualizado;
  }

  async delete(id) {
    const menu = await this.findOne(id);
    await menu.destroy();
    return { id };
  }
}

module.exports = MenuService;
