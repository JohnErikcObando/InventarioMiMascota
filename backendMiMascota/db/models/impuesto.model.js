const { Model, DataTypes } = require('sequelize');

const IMPUESTO_TABLE = 'impuestos';

const ImpuestoSchema = {
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
  porcentaje: {
    allowNull: false,
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  usuarioModif: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'usuario_modif',
    defaultValue: '',
  },
};

class Impuesto extends Model {
  static associate(models) {
    this.hasMany(models.ImpuestoFactura, {
      as: 'impuesto_factura',
      foreignKey: 'facturaVentaId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: IMPUESTO_TABLE,
      modelName: 'Impuesto',
      timestamps: false,
    };
  }
}

module.exports = { IMPUESTO_TABLE, ImpuestoSchema, Impuesto };
