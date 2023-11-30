const { Model, DataTypes } = require('sequelize');

const CAJA_TABLE = 'cajas';

const CajaSchema = {
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
  numFactura: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'num_factura',
  },
  prefijo: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  tipoFactura: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'tipo_factura',
  },
  usuarioModif: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'usuario_modif',
    defaultValue: '',
  },
};

class Caja extends Model {
  static associate(models) {
    // associate
    this.hasMany(models.FacturaCompra, {
      as: 'factura_compra',
      foreignKey: 'cajaId',
    });

    this.hasMany(models.FacturaVenta, {
      as: 'factura_venta',
      foreignKey: 'cajaId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CAJA_TABLE,
      modelName: 'Caja',
      timestamps: false,
    };
  }
}

module.exports = { CAJA_TABLE, CajaSchema, Caja };
