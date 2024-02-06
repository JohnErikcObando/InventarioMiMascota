const express = require('express');
const VentaService = require('../services/venta.service');
const validatorHandler = require('../middlewares/validator.handler');
const boom = require('@hapi/boom');

const {
  CreateVentaSchema,
  UpdateVentaSchema,
  GetVentaSchema,
} = require('../schemas/venta.schema');

const router = express.Router();
const service = new VentaService();

router.get('/', async (req, res, next) => {
  try {
    const ventas = await service.find();
    res.json(ventas);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(GetVentaSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const venta = await service.findOne(id);
      res.json(venta);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(CreateVentaSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newVenta = await service.create(body);
      res.status(201).json(newVenta);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/:id',
  validatorHandler(GetVentaSchema, 'params'),
  validatorHandler(UpdateVentaSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const venta = await service.update(id, body);
      res.json(venta);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(GetVentaSchema, 'params'),
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
