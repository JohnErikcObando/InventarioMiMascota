const { Model, DataTypes, Sequelize } = require('sequelize');

const ROL_USUARIO_TABLE = 'rol_usuarios';

const RolUsuarioSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  fecha_now: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  usuarioModif: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'usuario_modif',
    defaultValue: '',
  },
};

class RolUsuario extends Model {
  static associate(models) {
    // associate
    this.hasMany(models.Usuario, {
      as: 'usuario',
      foreignKey: 'rolUsuarioId',
    });
    this.hasMany(models.MenuRol, {
      as: 'menu_rol',
      foreignKey: 'rolUsuarioId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ROL_USUARIO_TABLE,
      modelName: 'RolUsuario',
      timestamps: false,
    };
  }
}

module.exports = { ROL_USUARIO_TABLE, RolUsuarioSchema, RolUsuario };
