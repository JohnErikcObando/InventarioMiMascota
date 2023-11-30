const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class RolUsuarioService {
  constructor() {}

  async create(data) {
    const nuevoRolUsuario = await models.RolUsuario.create(data);
    return nuevoRolUsuario;
  }

  async find() {
    const rolesUsuarios = await models.RolUsuario.findAll({
      include: [
        { model: models.Usuario, as: 'usuario' },
        { model: models.MenuRol, as: 'menu_rol' },
      ],
    });
    return rolesUsuarios;
  }

  async findOne(id) {
    const rolUsuario = await models.RolUsuario.findByPk(id, {
      include: [
        { model: models.Usuario, as: 'usuario' },
        { model: models.MenuRol, as: 'menu_rol' },
      ],
    });
    if (!rolUsuario) {
      throw boom.notFound('RolUsuario not found');
    }
    return rolUsuario;
  }

  async update(id, changes) {
    const rolUsuario = await this.findOne(id);
    const rolUsuarioActualizado = await rolUsuario.update(changes);
    return rolUsuarioActualizado;
  }

  async delete(id) {
    const rolUsuario = await this.findOne(id);
    await rolUsuario.destroy();
    return { id };
  }
}

module.exports = RolUsuarioService;
