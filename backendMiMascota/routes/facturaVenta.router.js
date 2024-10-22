const express = require('express');
const FacturaVentaService = require('../services/facturaVenta.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  CreateFacturaVentaSchema,
  UpdateFacturaVentaSchema,
  GetFacturaVentaSchema,
} = require('../schemas/facturaVenta.schema');
const boom = require('@hapi/boom');

const router = express.Router();
const service = new FacturaVentaService();

router.get('/', async (req, res, next) => {
  try {
    // Obtener las fechas desde los query params
    const { fechaInicio, fechaFin } = req.query;
    console.log('fechaInicio', fechaInicio, 'fechaFin', fechaFin);
    const facturasVenta = await service.find(fechaInicio, fechaFin);
    res.json(facturasVenta);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(GetFacturaVentaSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const facturaVenta = await service.findOne(id);
      res.json(facturaVenta);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(CreateFacturaVentaSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      console.log('body fatura venta: ', body);
      const newFacturaVenta = await service.create(body);
      res.status(201).json(newFacturaVenta);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/:id',
  validatorHandler(GetFacturaVentaSchema, 'params'),
  validatorHandler(UpdateFacturaVentaSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const facturaVenta = await service.update(id, body);
      res.json(facturaVenta);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(GetFacturaVentaSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  },
);

// Middleware de manejo de errores
router.use((err, req, res, next) => {
  console.error(err);

  if (!err.isBoom) {
    // Si el error no es de tipo Boom, crea un Boom error interno
    err = boom.internal(err.message || 'Internal Server Error');
  }

  res.status(err.output.statusCode).json(err.output.payload);
  next(); // Pasa el control al siguiente middleware
});

module.exports = router;
