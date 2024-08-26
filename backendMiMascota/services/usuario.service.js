const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');
const { Sequelize } = require('sequelize');

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

  async findByUsername(username) {
    const trimUsuario = username.trim();
    const usuarios = await models.Usuario.findAll({
      where: {
        usuario: {
          [Sequelize.Op.iLike]: trimUsuario,
        },
      },
    });

    if (!usuarios || usuarios.length === 0) {
      throw boom.notFound('Usuarios not found');
    }

    return usuarios;
  }

  // Método para validar usuario y contraseña
  async validateUser(username, password) {
    const trimUsername = username.trim();
    const usuario = await models.Usuario.findOne({
      where: {
        usuario: {
          [Sequelize.Op.iLike]: trimUsername,
        },
      },
      include: [{ model: models.RolUsuario, as: 'rol_usuario' }],
    });

    if (!usuario) {
      throw boom.notFound('Usuario not found');
    }

    if (usuario.password !== password) {
      throw boom.unauthorized('Invalid password');
    }

    return usuario;
  }
}

module.exports = UsuarioService;
