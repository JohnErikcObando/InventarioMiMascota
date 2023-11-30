const { Model, DataTypes, Sequelize } = require('sequelize');
const { FORMA_PAGO_TABLE } = require('./formaPago.model');
const { CAJA_TABLE } = require('./caja.model');
const { CLIENTE_TABLE } = require('./cliente.model');

const FACTURA_VENTA_TABLE = 'factura_ventas'; // Cambiado a minúsculas y con guiones bajos

const FacturaVentaSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
  },
  clienteId: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'cliente_id',
    references: {
      model: CLIENTE_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  cajaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'caja_id',
    references: {
      model: CAJA_TABLE,
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
  movimientoId: {
    allowNull: true,
    type: DataTypes.INTEGER,
    field: 'movimiento_id',
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
  descuento: {
    allowNull: false,
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  subtotal: {
    allowNull: false,
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  total: {
    allowNull: false,
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  abono: {
    allowNull: false,
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  saldo: {
    allowNull: false,
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  anulado: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  fechaNow: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    field: 'fecha_now',
  },
  descripcion: {
    allowNull: false,
    type: DataTypes.STRING(500),
    defaultValue: '',
  },
  usuarioModif: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'usuario_modif',
    defaultValue: '',
  },
};

class FacturaVenta extends Model {
  static associate(models) {
    this.belongsTo(models.FormaPago, { as: 'forma_pago' });
    this.belongsTo(models.Cliente, { as: 'cliente' });
    this.belongsTo(models.Caja, { as: 'caja' });

    // En tu modelo Sequelize (por ejemplo, FacturaVenta)
    this.hasMany(models.Venta, {
      as: 'detalleVenta',
      foreignKey: 'facturaVentaId',
    });

    this.hasMany(models.AbonoFacturaVenta, {
      as: 'abonoFacturaCV',
      foreignKey: 'facturaVentaId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: FACTURA_VENTA_TABLE,
      modelName: 'FacturaVenta',
      timestamps: false,
    };
  }
}

module.exports = { FACTURA_VENTA_TABLE, FacturaVentaSchema, FacturaVenta };
