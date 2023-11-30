const { Model, DataTypes, Sequelize } = require('sequelize');

const MOVIMIENTO_TABLE = 'movimientos';

const MovimientoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  fecha: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  tipo: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: '',
  },
  descripcion: {
    allowNull: false,
    type: DataTypes.STRING(500),
    defaultValue: '',
  },
  valor: {
    allowNull: false,
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  factura: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: '',
    field: 'factura',
  },
  fechaNow: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'fecha_now',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  usuarioModif: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'usuario_modif',
    defaultValue: '',
  },
};

class Movimiento extends Model {
  static associate() {
    // associate Factura
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: MOVIMIENTO_TABLE,
      modelName: 'Movimiento',
      timestamps: false,
    };
  }
}

module.exports = { MOVIMIENTO_TABLE, MovimientoSchema, Movimiento };
