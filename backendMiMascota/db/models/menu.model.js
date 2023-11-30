const { Model, DataTypes } = require('sequelize');

const MENU_TABLE = 'menus';

const MenuSchema = {
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
  icono: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: '',
  },
  url: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: '',
  },
  usuarioModif: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'usuario_modif',
    defaultValue: '',
  },
};

class Menu extends Model {
  static associate(models) {
    // associate
    this.hasMany(models.MenuRol, {
      as: 'menu_rol',
      foreignKey: 'menuId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: MENU_TABLE,
      modelName: 'Menu',
      timestamps: false,
    };
  }
}

module.exports = { MENU_TABLE, MenuSchema, Menu };
