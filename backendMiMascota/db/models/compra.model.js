const { Model, DataTypes, Sequelize } = require('sequelize');
const { PRODUCTO_TABLE } = require('./producto.model');
const { FACTURA_COMPRA_TABLE } = require('./facturaCompra.model');

const COMPRA_TABLE = 'compras'; // Cambiado a plural

const CompraSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },

  facturaCompraId: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'factura_compra_id',
    references: {
      model: FACTURA_COMPRA_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
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

  cantidad: {
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },

  costo: {
    allowNull: false,
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },

  venta: {
    allowNull: false,
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },

  total: {
    allowNull: false,
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },

  fechaNow: {
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

class Compra extends Model {
  static associate(models) {
    this.belongsTo(models.Producto, { as: 'producto' });
    this.belongsTo(models.FacturaCompra, { as: 'facturaCompra' }); // Cambiado a minúscula y más descriptivo
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: COMPRA_TABLE,
      modelName: 'Compra',
      timestamps: false,
    };
  }
}

module.exports = { COMPRA_TABLE, CompraSchema, Compra };
