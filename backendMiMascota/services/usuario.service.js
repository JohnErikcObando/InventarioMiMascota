const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class UsuarioService {
  constructor() {}

  async create(data) {
    const nuevoUsuario = await models.Usuario.create(data);
    return nuevoUsuario;
  }

  async find() {
    const usuarios = await models.Usuario.findAll({
      // include: [{ model: models.RolUsuario, as: 'rol_usuario' }],
    });
    return usuarios;
  }

  async findOne(id) {
    const usuario = await models.Usuario.findByPk(id, {
      include: [{ model: models.RolUsuario, as: 'rol_usuario' }],
    });
    if (!usuario) {
      throw boom.notFound('Usuario not found');
    }
    return usuario;
  }

  async update(id, changes) {
    const usuario = await this.findOne(id);
    const usuarioActualizado = await usuario.update(changes);
    return usuarioActualizado;
  }

  async delete(id) {
    const usuario = await this.findOne(id);
    await usuario.destroy();
    return { id };
  }
}

module.exports = UsuarioService;
