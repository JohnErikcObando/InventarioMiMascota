const { Model, DataTypes } = require('sequelize');

const CLIENTE_TABLE = 'clientes'; // Puedes considerar cambiar a 'clientes'

const ClienteSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  apellido: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: '',
  },
  direccion: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: '',
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
  email: {
    allowNull: true,
    type: DataTypes.STRING,
    defaultValue: '',
  },
  usuarioModif: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'usuario_modif',
    defaultValue: '',
  },
};

class Cliente extends Model {
  static associate(models) {
    this.hasMany(models.FacturaVenta, {
      as: 'factura_venta',
      foreignKey: 'clienteId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CLIENTE_TABLE,
      modelName: 'Cliente',
      timestamps: false,
    };
  }
}

module.exports = { CLIENTE_TABLE, ClienteSchema, Cliente };
