const express = require('express');
const HistorialService = require('../services/historial.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  CreateHistorialSchema,
  UpdateHistorialSchema,
  GetHistorialSchema,
} = require('../Schemas/historial.schema');
const boom = require('@hapi/boom');

const router = express.Router();
const service = new HistorialService();

router.get('/', async (req, res, next) => {
  try {
    const historiales = await service.find();
    res.json(historiales);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(GetHistorialSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const historial = await service.findOne(id);
      res.json(historial);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(CreateHistorialSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newHistorial = await service.create(body);
      res.status(201).json(newHistorial);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/:id',
  validatorHandler(GetHistorialSchema, 'params'),
  validatorHandler(UpdateHistorialSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const historial = await service.update(id, body);
      res.json(historial);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(GetHistorialSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id); // No content for successful deletion
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
