const { Model, DataTypes, Sequelize } = require('sequelize');

const HISTORIAL_TABLE = 'historial';

const HistorialSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  usuarioModif: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'usuario_modif',
    defaultValue: '',
  },
  campo: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: '',
  },
  modulo: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: '',
  },
  identificador: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: '',
  },
  fecha: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  nuevo: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: '',
  },
  anterior: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: '',
  },
  accion: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: '',
  },
};

class Historial extends Model {
  static associate() {
    // associate Usuario
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: HISTORIAL_TABLE,
      modelName: 'Historial',
      timestamps: false,
    };
  }
}

module.exports = { HISTORIAL_TABLE, HistorialSchema, Historial };
