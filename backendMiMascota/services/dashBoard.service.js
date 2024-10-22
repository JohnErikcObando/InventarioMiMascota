const { QueryTypes } = require('sequelize');
const sequelize = require('./../libs/sequelize');

class DashboardService {
  constructor() {}

  async obtenerMovimientosTipoMes() {
    try {
      const result = await sequelize.query(
        'SELECT * FROM obtenermovimientostipoymes()',
        {
          type: QueryTypes.SELECT,
        },
      );

      return result;
    } catch (error) {
      console.error('Error al obtener movimientos tipo mes:', error.message);
      throw error;
    }
  }

  async obtenerCategoriaMes() {
    try {
      const result = await sequelize.query(
        'SELECT * FROM ventas_por_categoria_por_mes()',
        {
          type: QueryTypes.SELECT,
        },
      );

      return result;
    } catch (error) {
      console.error('Error al obtener movimientos tipo mes:', error.message);
      throw error;
    }
  }

  async obtenerProductosMasVendidosPorMes() {
    try {
      const result = await sequelize.query(
        'SELECT * FROM obtenerproductosmasvendidospormes()',
        {
          type: QueryTypes.SELECT,
        },
      );

      return result;
    } catch (error) {
      console.error(
        'Error al obtener productos más vendidos por mes:',
        error.message,
      );
      throw error;
    }
  }

  async obtenerVentasPorDia() {
    try {
      // Implementa la lógica para obtener ventas por día
      // Puedes usar sequelize.query para ejecutar la consulta SQL necesaria
      const result = await sequelize.query(
        'SELECT * FROM obtenerventaspordia()',
        {
          type: QueryTypes.SELECT,
        },
      );

      return result;
    } catch (error) {
      console.error('Error al obtener ventas por día:', error.message);
      throw error;
    }
  }

  async obtenerVentasPorMes() {
    try {
      // Implementa la lógica para obtener ventas por mes
      const result = await sequelize.query(
        'SELECT * FROM obtenerventaspormes()',
        {
          type: QueryTypes.SELECT,
        },
      );

      return result;
    } catch (error) {
      console.error('Error al obtener ventas por mes:', error.message);
      throw error;
    }
  }

  async obtenerVentasPorSemana() {
    try {
      // Implementa la lógica para obtener ventas por semana
      const result = await sequelize.query(
        'SELECT * FROM obtenerventasporsemana()',
        {
          type: QueryTypes.SELECT,
        },
      );

      return result;
    } catch (error) {
      console.error('Error al obtener ventas por semana:', error.message);
      throw error;
    }
  }
}

module.exports = DashboardService;
