const { Model, DataTypes, Sequelize } = require('sequelize');
const { FORMA_PAGO_TABLE } = require('./formaPago.model');
const { PROVEEDOR_TABLE } = require('./proveedor.model');
const { CAJA_TABLE } = require('./caja.model');

const FACTURA_COMPRA_TABLE = 'factura_compras'; // Cambiado a minúsculas y con guiones bajos

const FacturaCompraSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
  },
  proveedorId: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'proveedor_id',
    references: {
      model: PROVEEDOR_TABLE,
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
  movimiento: {
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
  imagenUrl: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'imagen_url',
    defaultValue: '',
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

class FacturaCompra extends Model {
  static associate(models) {
    this.belongsTo(models.FormaPago, { as: 'forma_pago' });
    this.belongsTo(models.Proveedor, { as: 'proveedor' });
    this.belongsTo(models.Caja, { as: 'caja' });

    this.hasMany(models.Compra, {
      as: 'compra',
      foreignKey: 'facturaCompraId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: FACTURA_COMPRA_TABLE,
      modelName: 'FacturaCompra',
      timestamps: false,
    };
  }
}

module.exports = { FACTURA_COMPRA_TABLE, FacturaCompraSchema, FacturaCompra };
