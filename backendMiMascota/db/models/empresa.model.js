const { Model, DataTypes } = require('sequelize');

const EMPRESA_TABLE = 'empresas'; // Cambiado a plural y minúsculas

const EmpresaSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  direccion: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: '',
  },
  telefono: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: '',
  },
  celular: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: '',
  },
  logo: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: '', // Corregido a defaultValue
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: '', // Corregido a defaultValue
  },
  usuarioModif: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'usuario_modif',
    defaultValue: '',
  },
};

class Empresa extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: EMPRESA_TABLE,
      modelName: 'Empresa',
      timestamps: false,
    };
  }
}

module.exports = { EMPRESA_TABLE, EmpresaSchema, Empresa };
