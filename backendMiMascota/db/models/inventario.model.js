const { Model, DataTypes } = require('sequelize');

const { PRODUCTO_TABLE } = require('./producto.model');

const INVENTARIO_TABLE = 'inventarios';

const InventarioSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  productoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'producto_id',
    references: {
      model: PRODUCTO_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  entrada: {
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  salida: {
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  saldo: {
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
};

class Inventario extends Model {
  static associate(models) {
    // associate
    this.belongsTo(models.Producto, { as: 'producto' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: INVENTARIO_TABLE,
      modelName: 'Inventario',
      timestamps: false,
    };
  }
}

module.exports = { INVENTARIO_TABLE, InventarioSchema, Inventario };
