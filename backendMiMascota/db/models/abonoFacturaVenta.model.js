const { Model, DataTypes, Sequelize } = require('sequelize');
const { FACTURA_VENTA_TABLE } = require('./facturaVenta.model');
const { FORMA_PAGO_TABLE } = require('./formaPago.model');

const ABONO_FACTURA_TABLE_VENTA = 'abonos_factura_venta';

const AbonoFacturaVentaSchema = {
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
  formaPagoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'forma_pago_id',
    references: {
      model: FORMA_PAGO_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  fecha: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
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
  descripcion: {
    allowNull: false,
    type: DataTypes.STRING(500),
    defaultValue: '',
  },
  anulado: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  usuarioModif: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'usuario_modif',
    defaultValue: '',
  },
};

class AbonoFacturaVenta extends Model {
  static associate(models) {
    // associate Fatura
    this.belongsTo(models.FormaPago, { as: 'forma_pago' });
    this.belongsTo(models.FacturaVenta, { as: 'factura_venta' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ABONO_FACTURA_TABLE_VENTA,
      modelName: 'AbonoFacturaVenta',
      timestamps: false,
    };
  }
}

module.exports = {
  ABONO_FACTURA_TABLE_VENTA,
  AbonoFacturaVentaSchema,
  AbonoFacturaVenta,
};
