const express = require('express');
const DashboardService = require('../services/dashBoard.service');

const router = express.Router();
const service = new DashboardService();

router.get('/movimientos-tipo-mes', async (req, res, next) => {
  try {
    const movimientos = await service.obtenerMovimientosTipoMes();
    res.json(movimientos);
  } catch (error) {
    next(error);
  }
});

router.get('/productos-mas-vendidos-por-mes', async (req, res, next) => {
  try {
    const productosMasVendidos =
      await service.obtenerProductosMasVendidosPorMes();
    res.json(productosMasVendidos);
  } catch (error) {
    next(error);
  }
});

router.get('/ventas-por-dia', async (req, res, next) => {
  try {
    const ventasPorDia = await service.obtenerVentasPorDia();
    res.json(ventasPorDia);
  } catch (error) {
    next(error);
  }
});

router.get('/ventas-por-mes', async (req, res, next) => {
  try {
    const ventasPorMes = await service.obtenerVentasPorMes();
    res.json(ventasPorMes);
  } catch (error) {
    next(error);
  }
});

router.get('/ventas-por-semana', async (req, res, next) => {
  try {
    const ventasPorSemana = await service.obtenerVentasPorSemana();
    res.json(ventasPorSemana);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
