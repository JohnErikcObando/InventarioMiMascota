const { Model, DataTypes, Sequelize } = require('sequelize');

const { MARCA_TABLE } = require('./marca.model');
const { CATEGORIA_TABLE } = require('./categoria.model');

const PRODUCTO_TABLE = 'productos';

const ProductoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  marcaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'marca_id',
    references: {
      model: MARCA_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  categoriaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'categoria_id',
    references: {
      model: CATEGORIA_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: '',
  },
  codigo: {
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
  fechaNow: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'fecha_now',
    defaultValue: Sequelize.NOW,
  },
  imagenUrl: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'imagen_url',
    defaultValue: '',
  },
  usuarioModif: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'usuario_modif',
    defaultValue: '',
  },
};

class Producto extends Model {
  static associate(models) {
    // associate
    this.belongsTo(models.Marca, { as: 'marca' });
    this.belongsTo(models.Categoria, { as: 'categoria' });

    this.hasMany(models.Inventario, {
      as: 'inventario',
      foreignKey: 'productoId',
    });

    this.hasMany(models.Venta, {
      as: 'venta',
      foreignKey: 'productoId',
    });

    this.hasMany(models.Compra, {
      as: 'compra',
      foreignKey: 'productoId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCTO_TABLE,
      modelName: 'Producto',
      timestamps: false,
    };
  }
}

module.exports = { PRODUCTO_TABLE, ProductoSchema, Producto };
