const { Model, DataTypes, Sequelize } = require('sequelize');

const { ROL_USUARIO_TABLE } = require('./rolUsuario.model');

const USUARIO_TABLE = 'usuarios';

const UsuarioSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  rolUsuarioId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'rol_usuario_id',
    references: {
      model: ROL_USUARIO_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  usuario: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
    defaultValue: '',
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: '',
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: '',
  },
  apellido: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: '',
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
    defaultValue: '',
  },
  activo: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  fechaNow: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'fecha_now',
    defaultValue: Sequelize.NOW,
  },
  usuarioModif: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'usuario_modif',
    defaultValue: '',
  },
};

class Usuario extends Model {
  static associate(models) {
    // associate
    this.belongsTo(models.RolUsuario, { as: 'rol_usuario' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USUARIO_TABLE,
      modelName: 'Usuario',
      timestamps: false,
    };
  }
}

module.exports = { USUARIO_TABLE, UsuarioSchema, Usuario };
