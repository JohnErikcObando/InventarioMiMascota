const { Model, DataTypes } = require('sequelize');

const MARCA_TABLE = 'marcas';

const MarcaSchema = {
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

class Marca extends Model {
  static associate(models) {
    // associate
    this.hasMany(models.Producto, {
      as: 'producto',
      foreignKey: 'marcaId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: MARCA_TABLE,
      modelName: 'Marca',
      timestamps: false,
    };
  }
}

module.exports = { MARCA_TABLE, MarcaSchema, Marca };
