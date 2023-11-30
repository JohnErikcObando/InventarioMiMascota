const express = require('express');
const ImpuestoService = require('../services/impuesto.service');
const validatorHandler = require('../middlewares/validator.handler');
const boom = require('@hapi/boom');

const {
  CreateImpuestoSchema,
  UpdateImpuestoSchema,
  GetImpuestoSchema,
} = require('../Schemas/impuesto.schema');

const router = express.Router();
const service = new ImpuestoService();

router.get('/', async (req, res, next) => {
  try {
    const impuestos = await service.find();
    res.json(impuestos);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(GetImpuestoSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const impuesto = await service.findOne(id);
      res.json(impuesto);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(CreateImpuestoSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newImpuesto = await service.create(body);
      res.status(201).json(newImpuesto);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/:id',
  validatorHandler(GetImpuestoSchema, 'params'),
  validatorHandler(UpdateImpuestoSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const impuesto = await service.update(id, body);
      res.json(impuesto);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(GetImpuestoSchema, 'params'),
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
