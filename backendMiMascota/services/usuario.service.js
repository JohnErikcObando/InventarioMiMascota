const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { models } = require('./../libs/sequelize');
const { Sequelize } = require('sequelize');

class UsuarioService {
  constructor() {}

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);

    const nuevoUsuario = await models.Usuario.create({
      ...data,
      password: hash,
    });
    delete nuevoUsuario.dataValues.password;
    return nuevoUsuario;
  }

  async find() {
    const usuarios = await models.Usuario.findAll({
      // include: [{ model: models.RolUsuario, as: 'rol_usuario' }],
      order: [
        ['nombre', 'ASC'], // Orden ascendente por el campo 'nombre'
      ],
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

    // Si el campo "password" está en los cambios, hashear la contraseña
    if (changes.password) {
      const hash = await bcrypt.hash(changes.password, 10);
      changes.password = hash; // Reemplaza la contraseña con el hash
    }

    // Actualizar los demás campos
    const usuarioActualizado = await usuario.update(changes);

    // Eliminar el campo password del resultado
    delete usuarioActualizado.dataValues.password;

    return usuarioActualizado;
  }

  async delete(id) {
    const usuario = await this.findOne(id);
    await usuario.destroy();
    return { id };
  }

  async findByUsername(username) {
    const trimUsuario = username.trim();
    const usuarios = await models.Usuario.findOne({
      where: {
        usuario: {
          [Sequelize.Op.iLike]: trimUsuario,
        },
      },
      include: [
        {
          model: models.RolUsuario,
          as: 'rol_usuario',
        },
      ],
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
