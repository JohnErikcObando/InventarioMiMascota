const { Model, DataTypes } = require('sequelize');

const CATEGORIA_TABLE = 'categorias'; // Puedes considerar cambiar a 'categorias'

const CategoriaSchema = {
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

class Categoria extends Model {
  static associate(models) {
    // associate
    this.hasMany(models.Producto, {
      as: 'producto',
      foreignKey: 'categoriaId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORIA_TABLE,
      modelName: 'Categoria',
      timestamps: false,
    };
  }
}

module.exports = { CATEGORIA_TABLE, CategoriaSchema, Categoria };
