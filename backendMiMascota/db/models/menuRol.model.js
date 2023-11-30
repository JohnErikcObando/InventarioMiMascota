const { Model, DataTypes } = require('sequelize');

const { ROL_USUARIO_TABLE } = require('./rolUsuario.model');
const { MENU_TABLE } = require('./menu.model');

const MENU_ROL_TABLE = 'menu_rols';

const MenuRolSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  menuId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'menu_id',
    references: {
      model: MENU_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
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
  usuarioModif: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'usuario_modif',
    defaultValue: '',
  },
};

class MenuRol extends Model {
  static associate(models) {
    // associate
    this.belongsTo(models.Menu, { as: 'menu' });
    this.belongsTo(models.RolUsuario, { as: 'rol_usuario' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: MENU_ROL_TABLE,
      modelName: 'MenuRol',
      timestamps: false,
    };
  }
}

module.exports = { MENU_ROL_TABLE, MenuRolSchema, MenuRol };
