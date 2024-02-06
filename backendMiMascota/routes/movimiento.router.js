const express = require('express');
const MovimientoService = require('../services/movimiento.service');
const validatorHandler = require('../middlewares/validator.handler');
const boom = require('@hapi/boom');

const {
  CreateMovimientoSchema,
  UpdateMovimientoSchema,
  GetMovimientoSchema,
} = require('../schemas/movimiento.schema');

const router = express.Router();
const service = new MovimientoService();

router.get('/', async (req, res, next) => {
  try {
    const movimientos = await service.find();
    res.json(movimientos);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(GetMovimientoSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const movimiento = await service.findOne(id);
      res.json(movimiento);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(CreateMovimientoSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newMovimiento = await service.create(body);
      res.status(201).json(newMovimiento);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/:id',
  validatorHandler(GetMovimientoSchema, 'params'),
  validatorHandler(UpdateMovimientoSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const movimiento = await service.update(id, body);
      res.json(movimiento);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(GetMovimientoSchema, 'params'),
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
