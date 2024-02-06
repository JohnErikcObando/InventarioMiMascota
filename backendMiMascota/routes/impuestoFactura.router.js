const express = require('express');
const ImpuestoFacturaService = require('../services/impuestoFactura.service');
const validatorHandler = require('../middlewares/validator.handler');
const boom = require('@hapi/boom');

const {
  CreateImpuestoFacturaSchema,
  UpdateImpuestoFacturaSchema,
  GetImpuestoFacturaSchema,
} = require('../schemas/impuestoFactura.schema');

const router = express.Router();
const service = new ImpuestoFacturaService();

router.get('/', async (req, res, next) => {
  try {
    const impuestosFactura = await service.find();
    res.json(impuestosFactura);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(GetImpuestoFacturaSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const impuestoFactura = await service.findOne(id);
      res.json(impuestoFactura);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(CreateImpuestoFacturaSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newImpuestoFactura = await service.create(body);
      res.status(201).json(newImpuestoFactura);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/:id',
  validatorHandler(GetImpuestoFacturaSchema, 'params'),
  validatorHandler(UpdateImpuestoFacturaSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const impuestoFactura = await service.update(id, body);
      res.json(impuestoFactura);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(GetImpuestoFacturaSchema, 'params'),
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
