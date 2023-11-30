const { Model, DataTypes } = require('sequelize');

const PROVEEDOR_TABLE = 'proveedores';

const ProveedorSchema = {
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
  telefono: {
    allowNull: true,
    type: DataTypes.STRING,
    defaultValue: '',
  },
  celular: {
    allowNull: true,
    type: DataTypes.STRING,
    defaultValue: '',
  },
  direccion: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: '',
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
    defaultValue: '',
  },
  activo: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  usuarioModif: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'usuario_modif',
    defaultValue: '',
  },
};

class Proveedor extends Model {
  static associate(models) {
    this.hasMany(models.FacturaCompra, {
      as: 'factura_compra',
      foreignKey: 'proveedorId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PROVEEDOR_TABLE,
      modelName: 'Proveedor',
      timestamps: false,
    };
  }
}

module.exports = { PROVEEDOR_TABLE, ProveedorSchema, Proveedor };
