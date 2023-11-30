const { Model, DataTypes } = require('sequelize');

const FORMA_PAGO_TABLE = 'forma_pagos';

const FormaPagoSchema = {
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
  usuarioModif: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'usuario_modif',
    defaultValue: '',
  },
};

class FormaPago extends Model {
  static associate(models) {
    this.hasMany(models.FacturaCompra, {
      as: 'factura_compra',
      foreignKey: 'formaPagoId',
    });

    this.hasMany(models.FacturaVenta, {
      as: 'factura_venta',
      foreignKey: 'formaPagoId',
    });

    this.hasMany(models.AbonoFacturaVenta, {
      as: 'abono_factura',
      foreignKey: 'formaPagoId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: FORMA_PAGO_TABLE,
      modelName: 'FormaPago',
      timestamps: false,
    };
  }
}

module.exports = { FORMA_PAGO_TABLE, FormaPagoSchema, FormaPago };
