const { Model, DataTypes, Sequelize } = require('sequelize');

const { PRODUCTO_TABLE } = require('./producto.model');
const { FACTURA_VENTA_TABLE } = require('./facturaVenta.model');

const VENTA_TABLE = 'ventas';

const VentaSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },

  facturaVentaId: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'factura_venta_id',
    references: {
      model: FACTURA_VENTA_TABLE,
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

  valor: {
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

class Venta extends Model {
  static associate(models) {
    this.belongsTo(models.FacturaVenta, { as: 'factura_venta' });
    this.belongsTo(models.Producto, { as: 'producto' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: VENTA_TABLE,
      modelName: 'Venta',
      timestamps: false,
    };
  }
}

module.exports = { VENTA_TABLE, VentaSchema, Venta };
