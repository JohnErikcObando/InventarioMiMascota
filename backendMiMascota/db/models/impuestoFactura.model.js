const { Model, DataTypes } = require('sequelize');
const { FACTURA_VENTA_TABLE } = require('./facturaVenta.model');
const { IMPUESTO_TABLE } = require('./impuesto.model');

const IMPUESTO_FACTURA_TABLE = 'impuesto_facturas';

const ImpuestoFacturaSchema = {
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
  impuestoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'impuesto_id',
    references: {
      model: IMPUESTO_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  valor: {
    allowNull: false,
    type: DataTypes.FLOAT,
    defaultValue: 0, // Corrección aquí
  },
  usuarioModif: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'usuario_modif',
    defaultValue: '',
  },
};

class ImpuestoFactura extends Model {
  static associate(models) {
    this.belongsTo(models.FacturaVenta, { as: 'factura_venta' });
    this.belongsTo(models.Impuesto, { as: 'impuesto' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: IMPUESTO_FACTURA_TABLE,
      modelName: 'ImpuestoFactura',
      timestamps: false,
    };
  }
}

module.exports = {
  IMPUESTO_FACTURA_TABLE,
  ImpuestoFacturaSchema,
  ImpuestoFactura,
};
